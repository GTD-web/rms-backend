import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import {
    CreateReservationResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
    ReservationResponseDto,
    ReservationWithRelationsResponseDto,
} from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import {
    DataSource,
    FindOptionsWhere,
    LessThan,
    MoreThan,
    In,
    Between,
    LessThanOrEqual,
    Not,
    MoreThanOrEqual,
    Raw,
} from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationService } from '../services/reservation.service';
import { ParticipantService } from '../services/participant.service';
import { ReservationParticipant, Reservation, ReservationVehicle } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import {
    UpdateReservationCcReceipientDto,
    UpdateReservationDto,
    UpdateReservationParticipantsDto,
    UpdateReservationStatusDto,
    UpdateReservationTimeDto,
    UpdateReservationTitleDto,
} from '../dtos/update-reservation.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { User } from '@libs/entities';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { CronJob } from 'cron/dist';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { ReservationVehicleService } from '../services/reservation-vehicle.service';
import { ResourceResponseDto, ReturnVehicleDto } from '@resource/dtos.index';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
@Injectable()
export class ReservationUsecase {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly participantService: ParticipantService,
        private readonly reservationVehicleService: ReservationVehicleService,
        private readonly dataSource: DataSource,
        private readonly eventEmitter: EventEmitter2,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {}

    async onModuleInit() {
        const now = DateUtil.now().format();
        const notClosedReservations = await this.reservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                endDate: LessThanOrEqual(DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        }

        const reservations = await this.reservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                endDate: MoreThan(DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of reservations) {
            this.createReservationClosingJob(reservation);
        }
    }

    async handleCron() {
        const now = DateUtil.now().format();
        const notClosedReservations = await this.reservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                endDate: LessThanOrEqual(DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        }
    }

    /** 내 예약 리스트 조회 (날짜별, 자원 타입별 가능) */
    // v1 내 예약 히스토리리
    async findMyReservationList(
        employeeId: string,
        page?: number,
        limit?: number,
        resourceType?: ResourceType,
        startDate?: string,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const where: FindOptionsWhere<Reservation> = { participants: { employeeId, type: ParticipantsType.RESERVER } };
        // if (startDate) {
        //     where.startDate = Between(
        //         DateUtil.date(startDate + ' 00:00:00').toDate(),
        //         DateUtil.date(startDate + ' 23:59:59').toDate(),
        //     );
        // }
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        const options: RepositoryOptions = {
            where,
        };
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }

        const reservations = await this.reservationService.findAll(options);

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const count = await this.reservationService.count({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
        });
        return {
            items: reservationWithParticipants.map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    /** 자원별 예약 리스트 조회 */
    async findResourceReservationList(
        employeeId: string,
        resourceId: string,
        page?: number,
        limit?: number,
        month?: string,
        isMine?: boolean,
    ): Promise<GroupedReservationWithResourceResponseDto> {
        // 이번 달의 시작일과 마지막일 계산
        const monthStart = `${month}-01 00:00:00`;
        const lastDay = DateUtil.date(month).getLastDayOfMonth().getDate();
        const monthEnd = `${month}-${lastDay} 23:59:59`;

        const monthStartDate = DateUtil.date(monthStart).toDate();
        const monthEndDate = DateUtil.date(monthEnd).toDate();

        // Raw SQL을 사용하여 복잡한 날짜 조건 처리
        // 1. 시작일이 이번 달 안에 있는 경우
        // 2. 종료일이 이번 달 안에 있는 경우
        // 3. 시작일이 이번 달 이전이고 종료일이 이번 달 이후인 경우
        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :monthStartDate AND :monthEndDate OR
              "Reservation"."endDate" BETWEEN :monthStartDate AND :monthEndDate OR
              (${alias} <= :monthStartDate AND "Reservation"."endDate" >= :monthEndDate))`,
            { monthStartDate, monthEndDate },
        );

        const where: FindOptionsWhere<Reservation> = {
            startDate: dateCondition,
            resourceId: resourceId,
        };

        const [resources] = await this.eventEmitter.emitAsync('find.resource', {
            repositoryOptions: {
                where: { resourceId: resourceId },
            },
        });
        if (resources && resources.length === 0) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        const resource = resources[0];

        if (isMine) {
            where.participants = { employeeId, type: ParticipantsType.RESERVER };
        }

        const options: RepositoryOptions = {
            where,
        };

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }

        const reservations = await this.reservationService.findAll(options);
        const count = await this.reservationService.count({ where });

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['participants', 'participants.employee'],
            withDeleted: true,
        });

        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});

        const groupedReservationsResponse = Object.entries(groupedReservations).map(([date, reservations]) => ({
            date,
            reservations: (reservations as Reservation[]).map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
        }));

        return {
            resource: new ResourceResponseDto(resource),
            groupedReservations: groupedReservationsResponse,
        };
    }

    /** 내가 만든 예약들 중 현재 진행중인 예약 하나 */
    // Deprecated
    async findMyCurrentReservation(
        employeeId: string,
        resourceType: ResourceType,
    ): Promise<ReservationWithRelationsResponseDto> {
        const now = DateUtil.now().format();

        const where: FindOptionsWhere<Reservation> = {
            participants: { employeeId, type: ParticipantsType.RESERVER },
            status: ReservationStatus.CONFIRMED,
            resource: { type: resourceType as ResourceType },
            startDate: LessThan(DateUtil.date(now).toDate()),
            endDate: MoreThan(DateUtil.date(now).toDate()),
        };

        const reservation = await this.reservationService.findOne({
            where,
            relations: ['resource'],
            withDeleted: true,
        });
        return reservation ? new ReservationWithRelationsResponseDto(reservation) : null;
    }

    async findMyUsingReservationList(employeeId: string): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        // 현재 이용중인 예약 조회
        const where: FindOptionsWhere<Reservation>[] = [
            {
                participants: { employeeId, type: ParticipantsType.RESERVER },
                resource: { type: ResourceType.VEHICLE },
                status: ReservationStatus.CONFIRMED,
                startDate: LessThanOrEqual(DateUtil.date(DateUtil.now().format()).toDate()),
                endDate: MoreThanOrEqual(DateUtil.date(DateUtil.now().format()).toDate()),
            },
            {
                participants: { employeeId, type: ParticipantsType.RESERVER },
                status: ReservationStatus.CLOSED,
                reservationVehicles: {
                    isReturned: false,
                },
            },
        ];
        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'reservationVehicles', 'participants'],
            order: {
                startDate: 'ASC',
            },
            withDeleted: true,
        });
        reservations.sort((a, b) => {
            if (a.status === ReservationStatus.CONFIRMED) {
                return -1;
            }
            return 1;
        });
        return {
            items: reservations.map((reservation) => new ReservationWithRelationsResponseDto(reservation)),
            meta: {
                total: reservations.length,
                page: 1,
                limit: reservations.length,
                hasNext: false,
            },
        };
    }

    // v1 홈화면 예약 리스트 조회
    async findMyUpcomingReservationList(
        employeeId: string,
        query?: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        const { page, limit } = query;
        const today = DateUtil.date(DateUtil.now().format('YYYY-MM-DD 00:00:00')).toDate();
        const where: FindOptionsWhere<Reservation> = {
            participants: { employeeId, type: ParticipantsType.RESERVER },
            endDate: MoreThanOrEqual(today),
        };
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        const options: RepositoryOptions = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };
        const reservations = await this.reservationService.findAll(options);
        const count = reservations.length;

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            skip: (page - 1) * limit,
            take: limit,
            withDeleted: true,
        });

        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});

        const groupedReservationsResponse = Object.entries(groupedReservations).map(([date, reservations]) => ({
            date,
            reservations: (reservations as Reservation[]).map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
        }));

        return {
            items: groupedReservationsResponse,
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    // v1 홈화면 일정 리스트 조회
    async findMyAllSchedules(
        employeeId: string,
        query?: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        const { page, limit } = query;
        const today = DateUtil.date(DateUtil.now().format('YYYY-MM-DD 00:00:00')).toDate();
        const where: FindOptionsWhere<Reservation> = {
            participants: { employeeId },
            status: ReservationStatus.CONFIRMED,
            endDate: MoreThanOrEqual(today),
        };
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        const options: RepositoryOptions = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };

        const reservations = await this.reservationService.findAll(options);

        const count = reservations.length;

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            skip: (page - 1) * limit,
            take: limit,
            withDeleted: true,
        });

        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});

        const groupedReservationsResponse = Object.entries(groupedReservations).map(([date, reservations]) => ({
            date,
            reservations: (reservations as Reservation[]).map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
        }));

        return {
            items: groupedReservationsResponse,
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    /** 예약 상세 보기 */
    async findReservationDetail(user: User, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
                'reservationVehicles',
            ],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some(
            (reserver) => reserver.employeeId === user.employeeId,
        );

        return reservationResponseDto;
    }

    async findMyAllReservations(
        employeeId: string,
        page?: number,
        limit?: number,
        type?: ParticipantsType,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const today = DateUtil.now().toDate();
        const where: FindOptionsWhere<Reservation> = {
            participants: { employeeId, type },
            status: type === ParticipantsType.RESERVER ? Not(ReservationStatus.CLOSED) : ReservationStatus.CONFIRMED,
            // startDate: LessThanOrEqual(today),
            endDate: MoreThanOrEqual(today),
        };
        const options: RepositoryOptions = {
            where,
            relations: ['participants', 'participants.employee'],
        };
        const reservations = await this.reservationService.findAll(options);
        const count = reservations.length;

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            items: reservationWithParticipants.map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }

    // v1 관리자 예약 리스트 조회
    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        }
        if (status && status.filter((s) => ReservationStatus[s]).length === 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.INVALID_STATUS);
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        let where: FindOptionsWhere<Reservation> = {};

        if (status && status.length > 0) {
            where.status = In(status);
        }
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        if (resourceId) {
            where.resource = {
                resourceId,
            };
        }
        if (startDate && endDate) {
            // 예약 기간이 검색 범위와 겹치는 경우를 찾음
            // (예약 시작일 <= 검색 종료일) AND (예약 종료일 >= 검색 시작일)
            where = {
                ...where,
                startDate: LessThan(DateUtil.date(regex.test(endDate) ? endDate : endDate + ' 23:59:59').toDate()),
                endDate: MoreThan(DateUtil.date(regex.test(startDate) ? startDate : startDate + ' 00:00:00').toDate()),
            };
        }
        if (!startDate && !endDate) {
            const thisMonth = DateUtil.format(new Date(), 'YYYY-MM');
            const startDate = `${thisMonth}-01 00:00:00`;
            const endDate = `${thisMonth}-31 23:59:59`;

            where = {
                ...where,
                startDate: MoreThan(DateUtil.date(startDate).toDate()),
                endDate: LessThan(DateUtil.date(endDate).toDate()),
            };
        }

        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithRelationsResponseDto(reservation),
        );
        return reservationResponseDtos;
    }

    async checkReservationAccess(reservationId: string, employeeId: string): Promise<boolean> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, participants: { employeeId, type: ParticipantsType.RESERVER } },
            relations: ['participants'],
        });
        if (!reservation) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.COMMON.UNAUTHORIZED);
        }
        return true;
    }

    async makeReservation(user: User, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        const conflicts = await this.reservationService.findConflictingReservations(
            createDto.resourceId,
            DateUtil.date(createDto.startDate).toDate(),
            DateUtil.date(createDto.endDate).toDate(),
        );

        if (conflicts.length > 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.TIME_CONFLICT);
        }

        if (createDto.startDate > createDto.endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        }

        const [resources] = await this.eventEmitter.emitAsync('find.resource', {
            repositoryOptions: {
                where: { resourceId: createDto.resourceId },
                relations: ['vehicleInfo'],
            },
        });
        const resource = resources[0];
        if (!resource.isAvailable) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.RESOURCE_UNAVAILABLE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const reservation = this.reservationService.create(createDto);

            const savedReservation = await this.reservationService.save(reservation, {
                queryRunner,
            });

            // 차량 예약 정보 생성
            if (createDto.resourceType === ResourceType.VEHICLE) {
                const reservationVehicle = new ReservationVehicle();
                reservationVehicle.reservationId = savedReservation.reservationId!;
                reservationVehicle.vehicleInfoId = resource.vehicleInfo.vehicleInfoId;
                reservationVehicle.startOdometer = resource.vehicleInfo.totalMileage;
                reservationVehicle.isReturned = false;
                reservationVehicle.returnedAt = null;

                await this.reservationVehicleService.save(reservationVehicle, {
                    queryRunner,
                });
            }

            // 참가자 정보 저장
            await Promise.all([
                this.participantService.save(
                    {
                        reservationId: savedReservation.reservationId!,
                        employeeId: user.employeeId,
                        type: ParticipantsType.RESERVER,
                    } as ReservationParticipant,
                    { queryRunner },
                ),
                ...createDto.participantIds.map((employeeId) =>
                    this.participantService.save(
                        {
                            reservationId: savedReservation.reservationId!,
                            employeeId,
                            type: ParticipantsType.PARTICIPANT,
                        } as ReservationParticipant,
                        { queryRunner },
                    ),
                ),
            ]);

            await queryRunner.commitTransaction();

            try {
                const reservationWithResource = await this.reservationService.findOne({
                    where: { reservationId: savedReservation.reservationId! },
                    relations: ['resource'],
                    withDeleted: true,
                });

                if (reservationWithResource.status === ReservationStatus.CONFIRMED) {
                    this.createReservationClosingJob(reservationWithResource);
                    const notiTarget = [...createDto.participantIds, user.employeeId];
                    this.eventEmitter.emit('create.notification', {
                        notificationType: NotificationType.RESERVATION_STATUS_CONFIRMED,
                        notificationData: {
                            reservationId: reservationWithResource.reservationId,
                            reservationTitle: reservationWithResource.title,
                            reservationDate: DateUtil.toAlarmRangeString(
                                DateUtil.format(reservationWithResource.startDate),
                                DateUtil.format(reservationWithResource.endDate),
                            ),
                            resourceId: reservationWithResource.resource.resourceId,
                            resourceName: reservationWithResource.resource.name,
                            resourceType: reservationWithResource.resource.type,
                        },
                        notiTarget,
                    });
                    for (const beforeMinutes of reservationWithResource.notifyMinutesBeforeStart) {
                        this.eventEmitter.emit('create.notification', {
                            notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
                            notificationData: {
                                reservationId: reservationWithResource.reservationId,
                                reservationTitle: reservationWithResource.title,
                                resourceId: reservationWithResource.resource.resourceId,
                                resourceName: reservationWithResource.resource.name,
                                resourceType: reservationWithResource.resource.type,
                                reservationDate: DateUtil.format(reservationWithResource.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed');
            }

            return {
                reservationId: savedReservation.reservationId,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async updateReservation(reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED]) },
            relations: ['resource', 'participants'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        let hasUpdateTime = false;
        let hasUpdateParticipants = false;
        // 참가자 변경 여부 확인
        if (updateDto.participantIds) {
            // 참가자 변경 여부 확인 => 배열길이 확인, 배열 요소 비교
            hasUpdateParticipants =
                updateDto.participantIds.length !==
                    reservation.participants.filter((p) => p.type === ParticipantsType.PARTICIPANT).length ||
                updateDto.participantIds.some((id) => !reservation.participants.some((p) => p.employeeId === id));
        }

        if (updateDto.resourceId && updateDto.startDate && updateDto.endDate) {
            hasUpdateTime = true;
            const conflicts = await this.reservationService.findConflictingReservations(
                updateDto.resourceId,
                DateUtil.date(updateDto.startDate).toDate(),
                DateUtil.date(updateDto.endDate).toDate(),
                reservationId,
            );
            if (conflicts.length > 0) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.TIME_CONFLICT);
            }

            if (
                reservation.status === ReservationStatus.CONFIRMED &&
                reservation.resource.type === ResourceType.ACCOMMODATION
            ) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_ACCOMMODATION_TIME);
            }
        }
        const participantIds = updateDto.participantIds;
        delete updateDto.participantIds;
        let updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });

        const hasUpdateTings =
            updateDto.title || updateDto.isAllDay || updateDto.notifyBeforeStart || updateDto.notifyMinutesBeforeStart;

        if (hasUpdateTings) {
            updatedReservation = await this.reservationService.update(reservationId, {
                title: updateDto?.title || undefined,
                isAllDay: updateDto?.isAllDay || undefined,
                notifyBeforeStart: updateDto?.notifyBeforeStart || undefined,
                notifyMinutesBeforeStart: updateDto?.notifyMinutesBeforeStart || undefined,
            });
        }

        if (hasUpdateParticipants) {
            // 기존 참가자 조회
            const participants = reservation.participants.filter((p) => p.type === ParticipantsType.PARTICIPANT);
            const newParticipants = participantIds.filter((id) => !participants.some((p) => p.employeeId === id));
            const deletedParticipants = participants.filter((p) => !participantIds.includes(p.employeeId));
            // 기존 참가자 삭제
            await Promise.all(
                deletedParticipants.map((participant) => this.participantService.delete(participant.participantId)),
            );

            // 새로운 참가자 저장
            await Promise.all(
                newParticipants.map((employeeId) =>
                    this.participantService.save({
                        reservationId,
                        employeeId,
                        type: ParticipantsType.PARTICIPANT,
                    } as ReservationParticipant),
                ),
            );

            if (updatedReservation.resource.notifyParticipantChange) {
                try {
                    const notiTarget = [...newParticipants, ...participants.map((p) => p.employeeId)];

                    this.eventEmitter.emit('create.notification', {
                        notificationType: NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                        notificationData: {
                            reservationId: updatedReservation.reservationId,
                            reservationTitle: updatedReservation.title,
                            reservationDate: DateUtil.toAlarmRangeString(
                                DateUtil.format(updatedReservation.startDate),
                                DateUtil.format(updatedReservation.endDate),
                            ),
                            resourceId: updatedReservation.resource.resourceId,
                            resourceName: updatedReservation.resource.name,
                            resourceType: updatedReservation.resource.type,
                        },
                        notiTarget,
                    });
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateParticipants');
                }
            }
        }

        // 상태가 CONFIRMED인 경우에만 새로운 Job 생성
        if (hasUpdateTime) {
            if (reservation.status === ReservationStatus.CONFIRMED) {
                // 기존 Job 삭제
                this.deleteReservationClosingJob(reservationId);
                this.createReservationClosingJob(reservation);
            }
            updatedReservation = await this.reservationService.update(reservationId, {
                startDate: updateDto.startDate ? DateUtil.date(updateDto.startDate).toDate() : undefined,
                endDate: updateDto.endDate ? DateUtil.date(updateDto.endDate).toDate() : undefined,
            });
            if (updatedReservation.resource.notifyReservationChange) {
                try {
                    const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);

                    await this.eventEmitter.emitAsync('create.notification', {
                        notificationType: NotificationType.RESERVATION_TIME_CHANGED,
                        notificationData: {
                            reservationId: updatedReservation.reservationId,
                            reservationTitle: updatedReservation.title,
                            reservationDate: DateUtil.toAlarmRangeString(
                                DateUtil.format(updatedReservation.startDate),
                                DateUtil.format(updatedReservation.endDate),
                            ),
                            resourceId: updatedReservation.resource.resourceId,
                            resourceName: updatedReservation.resource.name,
                            resourceType: updatedReservation.resource.type,
                        },
                        notiTarget,
                    });

                    for (const beforeMinutes of updatedReservation.notifyMinutesBeforeStart) {
                        this.eventEmitter.emit('create.notification', {
                            notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
                            notificationData: {
                                reservationId: updatedReservation.reservationId,
                                reservationTitle: updatedReservation.title,
                                resourceId: updatedReservation.resource.resourceId,
                                resourceName: updatedReservation.resource.name,
                                resourceType: updatedReservation.resource.type,
                                reservationDate: DateUtil.format(updatedReservation.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateTime');
                }
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    async updateTitle(
        reservationId: string,
        updateDto: UpdateReservationTitleDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (reservation.status !== ReservationStatus.PENDING) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        const updatedReservation = await this.reservationService.update(reservationId, updateDto, repositoryOptions);
        return new ReservationResponseDto(updatedReservation);
    }

    async updateTime(reservationId: string, updateDto: UpdateReservationTimeDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'participants'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (
            reservation.status === ReservationStatus.CLOSED ||
            reservation.status === ReservationStatus.CANCELLED ||
            reservation.status === ReservationStatus.REJECTED
        ) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        if (
            reservation.status === ReservationStatus.CONFIRMED &&
            reservation.resource.type === ResourceType.ACCOMMODATION
        ) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_ACCOMMODATION_TIME);
        }

        const updatedReservation = await this.reservationService.update(reservationId, {
            ...updateDto,
            startDate: DateUtil.date(updateDto.startDate).toDate(),
            endDate: DateUtil.date(updateDto.endDate).toDate(),
        });

        // 상태가 CONFIRMED인 경우에만 새로운 Job 생성
        if (updatedReservation.status === ReservationStatus.CONFIRMED) {
            // 기존 Job 삭제
            this.deleteReservationClosingJob(reservationId);
            this.createReservationClosingJob(updatedReservation);
        }

        try {
            const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);

            this.eventEmitter.emit('create.notification', {
                notificationType: NotificationType.RESERVATION_TIME_CHANGED,
                notificationData: {
                    reservationId: updatedReservation.reservationId,
                    reservationTitle: updatedReservation.title,
                    reservationDate: DateUtil.toAlarmRangeString(
                        DateUtil.format(updatedReservation.startDate),
                        DateUtil.format(updatedReservation.endDate),
                    ),
                    resourceId: updatedReservation.resource.resourceId,
                    resourceName: updatedReservation.resource.name,
                    resourceType: updatedReservation.resource.type,
                },
                notiTarget,
            });
        } catch (error) {
            console.log(error);
            console.log('Notification creation failed in updateTime');
        }

        return new ReservationResponseDto(updatedReservation);
    }

    async updateParticipants(
        reservationId: string,
        updateDto: UpdateReservationParticipantsDto,
    ): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (
            reservation.status === ReservationStatus.CLOSED ||
            reservation.status === ReservationStatus.CANCELLED ||
            reservation.status === ReservationStatus.REJECTED
        ) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        // 기존 참가자 조회
        const participants = await this.participantService.findAll({
            where: { reservationId, type: ParticipantsType.PARTICIPANT },
        });

        // 기존 및 새로운 참가자 배열, 중복 제거
        const allParticipants = [
            ...participants.map((participant) => participant.employeeId),
            ...updateDto.participantIds,
        ];
        const uniqueParticipants = [...new Set(allParticipants)];

        // 기존 참가자 삭제
        await Promise.all(participants.map((participant) => this.participantService.delete(participant.participantId)));

        // 새로운 참가자 저장
        await Promise.all(
            updateDto.participantIds.map((employeeId) =>
                this.participantService.save({
                    reservationId,
                    employeeId,
                    type: ParticipantsType.PARTICIPANT,
                } as ReservationParticipant),
            ),
        );

        const updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });

        if (updatedReservation.resource.notifyParticipantChange) {
            try {
                const notiTarget = uniqueParticipants;

                this.eventEmitter.emit('create.notification', {
                    notificationType: NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                    notificationData: {
                        reservationId: updatedReservation.reservationId,
                        reservationTitle: updatedReservation.title,
                        reservationDate: DateUtil.toAlarmRangeString(
                            DateUtil.format(updatedReservation.startDate),
                            DateUtil.format(updatedReservation.endDate),
                        ),
                        resourceId: updatedReservation.resource.resourceId,
                        resourceName: updatedReservation.resource.name,
                        resourceType: updatedReservation.resource.type,
                    },
                    notiTarget,
                });
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateParticipants');
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'resource.resourceManagers'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        const updatedReservation = await this.reservationService.update(reservationId, updateDto);

        // 상태가 CANCELLED 또는 REJECTED인 경우 Job 삭제
        if (updateDto.status === ReservationStatus.CANCELLED || updateDto.status === ReservationStatus.REJECTED) {
            this.deleteReservationClosingJob(reservationId);
        }
        // 상태가 CONFIRMED로 변경된 경우 새로운 Job 생성
        if (updateDto.status === ReservationStatus.CONFIRMED) {
            this.createReservationClosingJob(updatedReservation);
        }

        if (reservation.resource.notifyReservationChange) {
            try {
                const reservers = await this.participantService.findAll({
                    where: { reservationId },
                });
                const notiTarget = [
                    ...reservation.resource.resourceManagers.map((manager) => manager.employeeId),
                    ...reservers.map((reserver) => reserver.employeeId),
                ];

                let notificationType: NotificationType;
                switch (updateDto.status) {
                    case ReservationStatus.CONFIRMED:
                        notificationType = NotificationType.RESERVATION_STATUS_CONFIRMED;
                        break;
                    case ReservationStatus.CANCELLED:
                        notificationType = NotificationType.RESERVATION_STATUS_CANCELLED;
                        break;
                    case ReservationStatus.REJECTED:
                        notificationType = NotificationType.RESERVATION_STATUS_REJECTED;
                        break;
                }

                this.eventEmitter.emit('create.notification', {
                    notificationType,
                    notificationData: {
                        reservationId: reservation.reservationId,
                        reservationTitle: reservation.title,
                        reservationDate: DateUtil.toAlarmRangeString(
                            DateUtil.format(reservation.startDate),
                            DateUtil.format(reservation.endDate),
                        ),
                        resourceId: reservation.resource.resourceId,
                        resourceName: reservation.resource.name,
                        resourceType: reservation.resource.type,
                    },
                    notiTarget,
                });
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateStatus');
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    async returnVehicle(user: User, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'resource.vehicleInfo', 'resource.resourceManagers'],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (reservation.resource.type !== ResourceType.VEHICLE) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_RESOURCE_TYPE);
        }

        if (reservation.status !== ReservationStatus.CONFIRMED && reservation.status !== ReservationStatus.CLOSED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_RETURN_STATUS(reservation.status));
        }

        if (reservation.resource.vehicleInfo.totalMileage > returnDto.totalMileage) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_MILEAGE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const reservationVehicles = await this.reservationVehicleService.findByReservationId(reservationId, {
                queryRunner,
            });

            if (!reservationVehicles || reservationVehicles.length === 0) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_NOT_FOUND);
            }

            const reservationVehicle = reservationVehicles[0];

            if (reservationVehicle.isReturned) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_ALREADY_RETURNED);
            }

            await this.reservationVehicleService.update(
                reservationVehicle.reservationVehicleId,
                {
                    endOdometer: returnDto.totalMileage,
                    isReturned: true,
                    returnedAt: DateUtil.now().toDate(),
                },
                { queryRunner },
            );

            const vehicleInfoId = reservation.resource.vehicleInfo.vehicleInfoId;

            await this.eventEmitter.emitAsync('update.resource', {
                resourceId: reservation.resource.resourceId,
                updateData: { location: returnDto.location },
                repositoryOptions: { queryRunner },
            });

            await this.eventEmitter.emitAsync('update.vehicle.info', {
                vehicleInfoId,
                updateData: {
                    totalMileage: returnDto.totalMileage,
                    leftMileage: returnDto.leftMileage,
                    parkingLocationImages: returnDto.parkingLocationImages,
                    odometerImages: returnDto.odometerImages,
                },
                repositoryOptions: { queryRunner },
            });

            const notiTarget = [
                ...reservation.resource.resourceManagers.map((manager) => manager.employeeId),
                user.employeeId,
            ];
            this.eventEmitter.emit('create.notification', {
                notificationType: NotificationType.RESOURCE_VEHICLE_RETURNED,
                notificationData: {
                    resourceId: reservation.resource.resourceId,
                    resourceName: reservation.resource.name,
                    resourceType: reservation.resource.type,
                },
                notiTarget,
            });

            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in returnVehicle:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    // 이 아래에 Job 삭제 메서드 추가
    private deleteReservationClosingJob(reservationId: string): void {
        const jobName = `closing-${reservationId}`;
        try {
            if (this.schedulerRegistry.doesExist('cron', jobName)) {
                this.schedulerRegistry.deleteCronJob(jobName);
                console.log(`Job ${jobName} deleted successfully`);
            }
        } catch (error) {
            console.log(`Failed to delete job ${jobName}: ${error.message}`);
        }
    }

    private async createReservationClosingJob(reservation: Reservation): Promise<void> {
        const jobName = `closing-${reservation.reservationId}`;
        console.log('createReservationClosingJob', jobName);
        const executeTime = DateUtil.date(reservation.endDate).toDate();

        // 과거 시간 체크
        if (executeTime.getTime() <= Date.now()) {
            console.log(`ExecuteTime time ${executeTime} is in the past, skipping cron job creation`);
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
            return;
        }

        // 기존 Job이 있다면 삭제
        this.deleteReservationClosingJob(reservation.reservationId);

        const job = new CronJob(executeTime, async () => {
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        job.start();
    }
}
