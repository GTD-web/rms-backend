import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DataSource, QueryRunner } from 'typeorm';
import { Employee, Reservation, ReservationParticipant, ReservationVehicle } from '@libs/entities';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus, ParticipantsType } from '@libs/enums/reservation-type.enum';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DateUtil } from '@libs/utils/date.util';
import {
    CalendarResponseDto,
    ReservationWithRelationsResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
} from '@src/application/reservation/core/dtos/reservation-response.dto';
import { ReservationQueryDto } from '@src/application/reservation/core/dtos/reservaion-query.dto';
import { ResponseNotificationDto } from '@src/application/notification/dtos/response-notification.dto';
import { ResourceResponseDto } from '@resource/dtos.index';
import { In, Raw, FindOptionsWhere, Between, MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { CronJob } from 'cron';
import { Role } from '@libs/enums/role-type.enum';
import { CreateReservationDto } from '@src/application/reservation/core/dtos/create-reservation.dto';
import { CreateReservationDto as ContextCreateReservationDto } from '../dtos/create-reservation.dto';
import {
    CreateReservationResponseDto,
    ReservationResponseDto,
} from '@src/application/reservation/core/dtos/reservation-response.dto';
import {
    UpdateReservationDto,
    ReturnVehicleDto,
    UpdateReservationStatusDto,
    UpdateReservationTimeDto,
} from '@src/application/reservation/core/dtos/update-reservation.dto';

@Injectable()
export class LegacyReservationContextService {
    constructor(
        private readonly domainReservationService: DomainReservationService,
        private readonly domainResourceService: DomainResourceService,
        private readonly domainNotificationService: DomainNotificationService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly domainEmployeeNotificationService: DomainEmployeeNotificationService,
        private readonly domainReservationParticipantService: DomainReservationParticipantService,
        private readonly domainReservationVehicleService: DomainReservationVehicleService,
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
        private readonly domainFileService: DomainFileService,
        private readonly notificationService: NotificationService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly dataSource: DataSource,
    ) {}

    // ==================== 캘린더 조회 ====================
    async 캘린더를_조회한다(user: Employee, query: ReservationQueryDto): Promise<CalendarResponseDto> {
        console.time('FindCalendarUsecase');
        const { startDate, endDate, resourceType, isMine, isMySchedules } = query;
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        // TODO: 추가 최적화 옵션들
        // 1. Redis 캐싱: 자주 조회되는 예약 데이터 캐싱 (TTL: 5분)
        // 2. 페이지네이션: 대량 데이터 처리시 청크 단위로 처리
        // 3. DB 인덱스: (start_date, status), (employee_id, is_read) 인덱스 확인

        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
            { startDateObj, endDateObj },
        );
        let participantCondition = {};
        if (!!isMine && !isMySchedules) {
            participantCondition = { participants: { employeeId: user.employeeId, type: ParticipantsType.RESERVER } };
        } else if (!isMine && !isMySchedules) {
            participantCondition = {};
        } else {
            participantCondition = { participants: { employeeId: user.employeeId } };
        }
        const where = {
            startDate: dateCondition,
            status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            ...(resourceType ? { resource: { type: resourceType } } : {}),
            ...participantCondition,
        };

        // 병렬 처리로 성능 개선: 85ms + 139ms → ~139ms (60% 개선 예상)
        console.time('parallel-queries');

        console.time('employee-query');
        const employeePromise = this.domainEmployeeService.findAll({
            select: {
                employeeId: true,
                name: true,
            },
        });
        console.time('reservation-query');

        const reservationPromise = this.domainReservationService.findAll({
            where: where,
            // N+1 쿼리 방지: participants.employee 제거 (가장 느린 부분)
            relations: ['resource', 'participants'],
            order: {
                startDate: 'ASC',
            },
            select: {
                reservationId: true,
                startDate: true,
                endDate: true,
                title: true,
                status: true,
                resource: {
                    resourceId: true,
                    name: true,
                    type: true,
                },
                participants: {
                    employeeId: true,
                    type: true,
                    // employee 정보는 별도로 조회하거나 클라이언트에서 처리
                },
            },
            withDeleted: true,
        });

        console.time('notification-query');
        const notificationPromise = this.domainNotificationService.findAll({
            where: {
                employees: {
                    employeeId: user.employeeId,
                    isRead: false,
                },
            },
            relations: ['employees'],
            select: {
                notificationId: true,
                notificationData: true,
            },
        });

        const [reservations, notis, employees] = await Promise.all([
            reservationPromise,
            notificationPromise,
            employeePromise,
        ]);
        console.timeEnd('employee-query');
        console.timeEnd('reservation-query');
        console.timeEnd('notification-query');
        console.timeEnd('parallel-queries');

        console.time('employee-map');
        const employeeMap = new Map();
        employees.forEach((employee) => {
            employeeMap.set(employee.employeeId, employee);
        });
        console.timeEnd('employee-map');
        console.time('map');
        const map = new Map();
        notis.forEach((noti) => {
            if (!map.has(noti.notificationData.reservationId)) {
                map.set(noti.notificationData.reservationId, true);
            }
        });
        console.timeEnd('map');

        console.time('map2');

        // 타임존 적용한 효율적인 날짜 포맷팅
        const formatter = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Seoul',
            hour12: false,
        });

        const formatDate = (date: Date | string) => {
            if (!date) return undefined;
            const dateObj = typeof date === 'string' ? new Date(date) : date;

            // 한 번의 formatToParts 호출로 모든 부분 가져오기
            const parts = formatter.formatToParts(dateObj);

            // parts를 객체로 변환하여 빠른 접근
            const partsObj: Record<string, string> = {};
            for (const part of parts) {
                partsObj[part.type] = part.value;
            }

            return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
        };

        const reservationsWithNotifications = reservations.map((reservation) => {
            // filter 2번 → 1번 순회로 최적화
            const participants = reservation.participants || [];
            const reservers = [];
            const participantsOnly = [];

            for (const participant of participants) {
                if (participant.type === ParticipantsType.RESERVER) {
                    reservers.push({
                        employeeId: participant.employeeId,
                        type: participant.type,
                        employee: employeeMap.get(participant.employeeId),
                    });
                } else if (participant.type === ParticipantsType.PARTICIPANT) {
                    participantsOnly.push({
                        employeeId: participant.employeeId,
                        type: participant.type,
                        employee: employeeMap.get(participant.employeeId),
                    });
                }
            }

            return {
                reservationId: reservation.reservationId,
                title: reservation.title,
                startDate: formatDate(reservation.startDate),
                endDate: formatDate(reservation.endDate),
                status: reservation.status,
                resource: reservation.resource,
                reservers,
                participants: participantsOnly,
                hasUnreadNotification: map.has(reservation.reservationId),
            };
        });
        console.timeEnd('map2');

        console.timeEnd('FindCalendarUsecase');
        return {
            reservations: reservationsWithNotifications,
        };
    }

    // ==================== 확인 필요 예약 목록 조회 ====================
    async 확인필요_예약목록을_조회한다(
        query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const { page, limit } = query;
        // 숙소 - 예약 승인 대기
        // 차량 - 예약 확정, 반납 완료
        const where: FindOptionsWhere<Reservation>[] = [
            {
                status: ReservationStatus.PENDING,
                resource: {
                    type: ResourceType.ACCOMMODATION,
                },
            },
        ];

        const options: IRepositoryOptions<Reservation> = {
            where,
            relations: ['resource', 'reservationVehicles', 'participants', 'participants.employee'],
            withDeleted: true,
        };

        const reservations = await this.domainReservationService.findAll(options);
        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithRelationsResponseDto(reservation),
        );

        return {
            items: reservationResponseDtos,
            meta: {
                total: reservations.length,
                page: 1,
                limit: reservations.length,
                hasNext: false,
            },
        };
    }

    // ==================== 충돌 예약 조회 ====================
    async 충돌_예약을_조회한다(
        resourceId: string,
        startDate: Date,
        endDate: Date,
        reservationId?: string,
    ): Promise<Reservation[]> {
        return await this.domainReservationService.findAll({
            where: {
                resourceId,
                ...(reservationId && { reservationId: Not(reservationId) }),
                startDate: LessThan(endDate),
                endDate: MoreThan(startDate),
                status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            },
        });
    }

    // ==================== 지연 차량 알림 조회 ====================
    async 지연_차량_알림을_조회한다(reservationId: string): Promise<ResponseNotificationDto[]> {
        const notifications = await this.domainNotificationService.findAll({
            where: {
                notificationData: Raw((alias) => `${alias} -> 'reservation' ->> 'reservationId' = '${reservationId}'`),
                notificationType: NotificationType.RESOURCE_VEHICLE_DELAYED_RETURNED,
            },
        });

        return notifications;
    }

    // ==================== 내 모든 일정 조회 ====================
    async 내_모든_일정을_조회한다(
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
        const options: IRepositoryOptions<Reservation> = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };

        const reservations = await this.domainReservationService.findAll(options);

        const count = reservations.length;

        const reservationWithParticipants = await this.domainReservationService.findAll({
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

    // ==================== 내 예약 목록 조회 ====================
    async 내_예약목록을_조회한다(
        employeeId: string,
        page?: number,
        limit?: number,
        resourceType?: ResourceType,
        startDate?: string,
        endDate?: string,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        const where: FindOptionsWhere<Reservation> = { participants: { employeeId, type: ParticipantsType.RESERVER } };
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }

        if (startDate && endDate) {
            where.startDate = MoreThanOrEqual(DateUtil.date(startDate).getFirstDayOfMonth().toDate());
            where.endDate = LessThanOrEqual(DateUtil.date(endDate).getLastDayOfMonth().toDate());
        }
        const options: IRepositoryOptions<Reservation> = {
            where,
            order: {
                startDate: 'DESC',
            },
        };
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }

        const reservations = await this.domainReservationService.findAll(options);

        const reservationWithParticipants = await this.domainReservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee', 'reservationVehicles'],
            withDeleted: true,
        });
        const count = await this.domainReservationService.count({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
        });

        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});

        const groupedReservationsResponse = Object.entries(groupedReservations)
            .map(([date, reservations]) => ({
                date,
                reservations: (reservations as Reservation[]).map(
                    (reservation) => new ReservationWithRelationsResponseDto(reservation),
                ),
            }))
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            });

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

    // ==================== 내 다가오는 예약 목록 조회 ====================
    async 내_다가오는_예약목록을_조회한다(
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
        const options: IRepositoryOptions<Reservation> = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };
        const reservations = await this.domainReservationService.findAll(options);
        const count = reservations.length;

        const reservationWithParticipants = await this.domainReservationService.findAll({
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

    // ==================== 내 이용중인 예약 목록 조회 ====================
    async 내_이용중인_예약목록을_조회한다(
        employeeId: string,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
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
        const reservations = await this.domainReservationService.findAll({
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

    // ==================== 자원별 예약 목록 조회 ====================
    async 자원별_예약목록을_조회한다(
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

        const resource = await this.domainResourceService.findOne({
            where: { resourceId: resourceId },
        });
        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        if (isMine) {
            where.participants = { employeeId, type: ParticipantsType.RESERVER };
        }

        const options: IRepositoryOptions<Reservation> = {
            where,
        };

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }

        const reservations = await this.domainReservationService.findAll(options);
        const count = await this.domainReservationService.count({ where });

        const reservationWithParticipants = await this.domainReservationService.findAll({
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

    // ==================== 예약 상세 조회 ====================
    async 예약_상세를_조회한다(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.domainReservationService.findOne({
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

        reservationResponseDto.returnable =
            reservationResponseDto.resource.type === ResourceType.VEHICLE
                ? reservationResponseDto.isMine &&
                  reservationResponseDto.reservationVehicles.some(
                      (reservationVehicle) => !reservationVehicle.isReturned,
                  ) &&
                  reservationResponseDto.startDate <= DateUtil.now().format()
                : null;

        reservationResponseDto.modifiable =
            [ReservationStatus.PENDING, ReservationStatus.CONFIRMED].includes(reservation.status) &&
            reservationResponseDto.isMine &&
            reservationResponseDto.endDate > DateUtil.now().format();

        const notifications = await this.domainNotificationService.findAll({
            where: {
                notificationData: Raw(
                    (alias) => `${alias} -> 'reservation' ->> 'reservationId' = '${reservation.reservationId}'`,
                ),
                employees: {
                    employeeId: user.employeeId,
                    isRead: false,
                },
            },
            relations: ['employees'],
        });

        if (notifications.length > 0) {
            const employeeNotifications = notifications
                .map((notification) => notification.employees.map((employee) => employee.employeeNotificationId).flat())
                .flat();
            const updatedEmployeeNotifications = await Promise.all(
                employeeNotifications.map((employeeNotificationId) =>
                    this.domainEmployeeNotificationService.update(employeeNotificationId, {
                        isRead: true,
                    }),
                ),
            );
        }

        return reservationResponseDto;
    }

    // ==================== 관리자용 예약 목록 조회 ====================
    async 예약목록을_조회한다(
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

        const reservations = await this.domainReservationService.findAll({
            where,
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithRelationsResponseDto(reservation),
        );
        return reservationResponseDtos;
    }

    // ==================== 예약 접근 권한 확인 ====================
    async 예약_접근권한을_확인한다(reservationId: string, employeeId: string): Promise<boolean> {
        const reservation = await this.domainReservationService.findOne({
            where: { reservationId, participants: { employeeId, type: ParticipantsType.RESERVER } },
            relations: ['participants'],
        });
        if (!reservation) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.COMMON.UNAUTHORIZED);
        }
        return true;
    }

    // ==================== 예약 생성 ====================
    async 자원예약이_가능한지_확인한다(resourceId: string, startDate: Date, endDate: Date): Promise<boolean> {
        const conflicts = await this.domainReservationService.findAll({
            where: {
                resourceId,
                status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
                startDate: LessThan(endDate),
                endDate: MoreThan(startDate),
                // ...(reservationId && { reservationId: Not(reservationId) }),
            },
        });
        return conflicts.length === 0;
    }

    async 자원예약을_생성한다(
        reservationData: ContextCreateReservationDto,
        queryRunner?: QueryRunner,
    ): Promise<Reservation> {
        const reservationEntity = {
            title: reservationData.title,
            description: reservationData.description,
            resourceId: reservationData.resourceId,
            startDate: reservationData.startDate,
            endDate: reservationData.endDate,
            status: reservationData.status,
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        const savedReservation = await this.domainReservationService.save(reservationEntity, {
            queryRunner: queryRunner,
        });

        // TODO : 자원 유형별로 예약정보가 필요할 경우 스위치 문으로 정리
        // 차량 예약 정보 생성
        if (reservationData.resourceType === ResourceType.VEHICLE) {
            // 차량 리소스 정보 조회
            const resource = await this.domainResourceService.findOne({
                where: { resourceId: reservationData.resourceId },
            });
            const vehicleInfo = await this.domainVehicleInfoService.findByResourceId(reservationData.resourceId);
            if (!vehicleInfo) {
                throw new NotFoundException('차량 정보를 찾을 수 없습니다.');
            }

            const reservationVehicleEntity = {
                reservationId: savedReservation.reservationId!,
                vehicleInfoId: vehicleInfo.vehicleInfoId,
                startOdometer: vehicleInfo.totalMileage,
                isReturned: false,
                returnedAt: null,
                location: resource.location,
            };

            await this.domainReservationVehicleService.save(reservationVehicleEntity, {
                queryRunner,
            });
        }

        return savedReservation;
    }

    async 예약을_생성한다(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        const conflicts = await this.충돌_예약을_조회한다(
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

        const resource = await this.domainResourceService.findOne({
            where: { resourceId: createDto.resourceId },
            relations: ['vehicleInfo'],
        });

        if (!resource.isAvailable) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.RESOURCE_UNAVAILABLE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            createDto.status =
                createDto.resourceType === ResourceType.ACCOMMODATION
                    ? ReservationStatus.PENDING
                    : ReservationStatus.CONFIRMED;

            const reservation = await this.domainReservationService.create(createDto);
            reservation.startDate = DateUtil.date(createDto.startDate).toDate();
            reservation.endDate = DateUtil.date(createDto.endDate).toDate();

            const savedReservation = await this.domainReservationService.save(reservation, {
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
                reservationVehicle.location = resource.location;

                await this.domainReservationVehicleService.save(reservationVehicle, {
                    queryRunner,
                });
            }

            // 참가자 정보 저장
            await Promise.all([
                this.domainReservationParticipantService.save(
                    {
                        reservationId: savedReservation.reservationId!,
                        employeeId: user.employeeId,
                        type: ParticipantsType.RESERVER,
                    } as ReservationParticipant,
                    { queryRunner },
                ),
                ...createDto.participantIds.map((employeeId) =>
                    this.domainReservationParticipantService.save(
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

            if (resource.type !== ResourceType.VEHICLE) {
                await this.예약_종료작업을_생성한다(savedReservation);
            }

            try {
                const reservationWithResource = await this.domainReservationService.findOne({
                    where: { reservationId: savedReservation.reservationId! },
                    relations: ['resource'],
                    withDeleted: true,
                });

                if (reservationWithResource.status === ReservationStatus.CONFIRMED) {
                    const notiTarget = [...createDto.participantIds, user.employeeId];
                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_STATUS_CONFIRMED,
                        {
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
                    );
                    for (const beforeMinutes of reservationWithResource.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(
                            NotificationType.RESERVATION_DATE_UPCOMING,
                            {
                                reservationId: reservationWithResource.reservationId,
                                reservationTitle: reservationWithResource.title,
                                resourceId: reservationWithResource.resource.resourceId,
                                resourceName: reservationWithResource.resource.name,
                                resourceType: reservationWithResource.resource.type,
                                reservationDate: DateUtil.format(reservationWithResource.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        );
                    }
                } else if (
                    reservationWithResource.status === ReservationStatus.PENDING &&
                    reservationWithResource.resource.type === ResourceType.ACCOMMODATION
                ) {
                    const systemAdmins = await this.domainEmployeeService.findAll({
                        where: {
                            roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
                        },
                    });

                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_STATUS_PENDING,
                        {
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
                        systemAdmins.map((user) => user.employeeId),
                    );
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

    // ==================== 예약 수정 ====================
    async 예약을_수정한다(reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto> {
        const reservation = await this.domainReservationService.findOne({
            where: { reservationId, status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED]) },
            relations: ['resource', 'participants'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        if (reservation.status === ReservationStatus.CLOSED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
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
            const conflicts = await this.충돌_예약을_조회한다(
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
        let updatedReservation = await this.domainReservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });

        const hasUpdateTings =
            updateDto.title || updateDto.isAllDay || updateDto.notifyBeforeStart || updateDto.notifyMinutesBeforeStart;

        if (hasUpdateTings) {
            updatedReservation = await this.domainReservationService.update(
                reservationId,
                {
                    title: updateDto?.title || undefined,
                    isAllDay: updateDto?.isAllDay || undefined,
                    notifyBeforeStart: updateDto?.notifyBeforeStart || undefined,
                    notifyMinutesBeforeStart: updateDto?.notifyMinutesBeforeStart || undefined,
                },
                {
                    where: { reservationId },
                    relations: ['participants', 'resource'],
                    withDeleted: true,
                },
            );
        }

        if (hasUpdateParticipants) {
            // 기존 참가자 조회
            const participants = reservation.participants.filter((p) => p.type === ParticipantsType.PARTICIPANT);
            const newParticipants = participantIds.filter((id) => !participants.some((p) => p.employeeId === id));
            const deletedParticipants = participants.filter((p) => !participantIds.includes(p.employeeId));
            // 기존 참가자 삭제
            await Promise.all(
                deletedParticipants.map((participant) =>
                    this.domainReservationParticipantService.delete(participant.participantId),
                ),
            );

            // 새로운 참가자 저장
            await Promise.all(
                newParticipants.map((employeeId) =>
                    this.domainReservationParticipantService.save({
                        reservationId,
                        employeeId,
                        type: ParticipantsType.PARTICIPANT,
                    } as ReservationParticipant),
                ),
            );

            if (updatedReservation.resource.notifyParticipantChange) {
                try {
                    const notiTarget = [...newParticipants, ...participants.map((p) => p.employeeId)];

                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                        {
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
                    );
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateParticipants');
                }
            }
        }

        // 상태가 CONFIRMED인 경우에만 새로운 Job 생성
        if (hasUpdateTime) {
            updatedReservation = await this.domainReservationService.update(
                reservationId,
                {
                    startDate: updateDto.startDate ? DateUtil.date(updateDto.startDate).toDate() : undefined,
                    endDate: updateDto.endDate ? DateUtil.date(updateDto.endDate).toDate() : undefined,
                },
                {
                    where: { reservationId },
                    relations: ['participants', 'resource'],
                    withDeleted: true,
                },
            );
            if (updatedReservation.resource.notifyReservationChange) {
                try {
                    await this.notificationService.deleteScheduleJob(updatedReservation.reservationId);

                    const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);

                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_TIME_CHANGED,
                        {
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
                    );

                    for (const beforeMinutes of updatedReservation.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(
                            NotificationType.RESERVATION_DATE_UPCOMING,
                            {
                                reservationId: updatedReservation.reservationId,
                                reservationTitle: updatedReservation.title,
                                resourceId: updatedReservation.resource.resourceId,
                                resourceName: updatedReservation.resource.name,
                                resourceType: updatedReservation.resource.type,
                                reservationDate: DateUtil.format(updatedReservation.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        );
                    }
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateTime');
                }
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    // ==================== 예약 상태 변경 ====================
    async 예약상태를_변경한다(
        reservationId: string,
        updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        const reservation = await this.domainReservationService.findOne({
            where: { reservationId },
            // relations: ['resource', 'resource.resourceManagers'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (reservation.status === ReservationStatus.CLOSED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        const updatedReservation = await this.domainReservationService.update(reservationId, updateDto, {
            relations: ['resource', 'resource.resourceManagers', 'participants', 'participants.employee'],
            withDeleted: true,
        });

        // 상태가 CANCELLED 또는 REJECTED인 경우 Job 삭제
        if (updateDto.status === ReservationStatus.CANCELLED || updateDto.status === ReservationStatus.REJECTED) {
            this.예약_종료작업을_삭제한다(reservationId);
        }

        // 상태가 CONFIRMED로 변경된 경우 새로운 Job 생성
        if (updateDto.status === ReservationStatus.CONFIRMED) {
            this.예약_종료작업을_생성한다(updatedReservation);
        }

        const notiTarget = [
            ...updatedReservation.resource.resourceManagers.map((manager) => manager.employeeId),
            ...updatedReservation.participants.map((reserver) => reserver.employeeId),
        ];

        if (updatedReservation.resource.notifyReservationChange && updateDto.status !== ReservationStatus.CLOSED) {
            try {
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

                await this.notificationService.createNotification(
                    notificationType,
                    {
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
                );
                if (updateDto.status === ReservationStatus.CONFIRMED) {
                    for (const beforeMinutes of updatedReservation.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(
                            NotificationType.RESERVATION_DATE_UPCOMING,
                            {
                                reservationId: updatedReservation.reservationId,
                                reservationTitle: updatedReservation.title,
                                resourceId: updatedReservation.resource.resourceId,
                                resourceName: updatedReservation.resource.name,
                                resourceType: updatedReservation.resource.type,
                                reservationDate: DateUtil.format(updatedReservation.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        );
                    }
                }
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateStatus');
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    // ==================== 예약 취소 ====================
    async 예약을_취소한다(reservationId: string): Promise<ReservationResponseDto> {
        return this.예약상태를_변경한다(reservationId, { status: ReservationStatus.CANCELLED });
    }

    // ==================== 차량 반납 ====================
    async 차량을_반납한다(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        const reservation = await this.domainReservationService.findOne({
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

        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_RETURN_STATUS(reservation.status));
        }

        if (reservation.resource.vehicleInfo.totalMileage > returnDto.totalMileage) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_MILEAGE);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const reservationVehicles = await this.domainReservationVehicleService.findAll({
                where: { reservationId },
                relations: ['reservation', 'vehicleInfo'],
            });

            if (!reservationVehicles || reservationVehicles.length === 0) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_NOT_FOUND);
            }

            const reservationVehicle = reservationVehicles[0];

            if (reservationVehicle.isReturned) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_ALREADY_RETURNED);
            }

            await this.domainReservationService.update(
                reservationId,
                {
                    status: ReservationStatus.CLOSED,
                },
                { queryRunner },
            );

            await this.domainReservationVehicleService.update(
                reservationVehicle.reservationVehicleId,
                {
                    endOdometer: returnDto.totalMileage,
                    isReturned: true,
                    returnedAt: DateUtil.now().toDate(),
                    location: returnDto.location,
                    returnedBy: user.employeeId,
                },
                { queryRunner },
            );

            const vehicleInfoId = reservation.resource.vehicleInfo.vehicleInfoId;

            await this.domainResourceService.update(
                reservation.resource.resourceId,
                { location: returnDto.location },
                { queryRunner },
            );

            if (!returnDto.parkingLocationImages) returnDto.parkingLocationImages = [];
            if (!returnDto.odometerImages) returnDto.odometerImages = [];
            if (!returnDto.indoorImages) returnDto.indoorImages = [];
            returnDto.parkingLocationImages = returnDto.parkingLocationImages.map((image) =>
                this.domainFileService.getFileUrl(image),
            );
            returnDto.odometerImages = returnDto.odometerImages.map((image) =>
                this.domainFileService.getFileUrl(image),
            );
            returnDto.indoorImages = returnDto.indoorImages.map((image) => this.domainFileService.getFileUrl(image));

            const images = [...returnDto.parkingLocationImages, ...returnDto.odometerImages, ...returnDto.indoorImages];

            if (images.length > 0) {
                await this.domainFileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }

            await this.domainVehicleInfoService.update(
                vehicleInfoId,
                {
                    totalMileage: returnDto.totalMileage,
                    leftMileage: returnDto.leftMileage,
                    parkingLocationImages: returnDto.parkingLocationImages,
                    odometerImages: returnDto.odometerImages,
                    indoorImages: returnDto.indoorImages,
                },
                { queryRunner },
            );

            const notiTarget = [user.employeeId];
            await this.notificationService.createNotification(
                NotificationType.RESOURCE_VEHICLE_RETURNED,
                {
                    resourceId: reservation.resource.resourceId,
                    resourceName: reservation.resource.name,
                    resourceType: reservation.resource.type,
                },
                notiTarget,
            );

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

    // ==================== 예약 연장 가능 여부 확인 ====================
    async 예약_연장가능여부를_확인한다(employeeId: string, reservationId: string): Promise<boolean> {
        // 1. 예약자 검증 - 해당 예약의 예약자가 맞는지 확인
        await this.예약_접근권한을_확인한다(reservationId, employeeId);

        // 2. 예약 정보 조회 및 검증
        const reservation = await this.domainReservationService.findOne({
            where: { reservationId },
            relations: ['resource'],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        // 3. 예약 타이밍 검증 (예약 종료 15분 전부터 연장 가능)
        const currentTime = DateUtil.now().toDate();
        const extendableStartTime = DateUtil.date(reservation.endDate).addMinutes(-15).toDate();

        console.log('reservation', reservation);
        console.log('currentTime', currentTime);
        console.log('extendableStartTime', extendableStartTime);

        // 현재 시간이 연장 가능 시간 범위에 있는지 확인
        if (currentTime < extendableStartTime || currentTime > reservation.endDate) {
            console.log('isAvailable', false);
            return false;
        }

        // 4. 연장 시간(30분)에 다른 예약과 충돌하는지 확인
        const extendedEndTime = DateUtil.date(reservation.endDate).addMinutes(30).toDate();
        const conflictReservations = await this.충돌_예약을_조회한다(
            reservation.resourceId,
            reservation.endDate,
            extendedEndTime,
            reservationId,
        );

        const isConflict = conflictReservations.length > 0;
        console.log('isConflict', isConflict);

        return !isConflict;
    }

    // ==================== 예약 연장 ====================
    async 예약을_연장한다(
        employeeId: string,
        reservationId: string,
        extendDto: UpdateReservationTimeDto,
    ): Promise<ReservationResponseDto> {
        // 1. 예약자 검증 - 해당 예약의 예약자가 맞는지 확인
        await this.예약_접근권한을_확인한다(reservationId, employeeId);

        // 2. 예약 시간 업데이트 (기존 예약 수정 로직 활용)
        const updatedReservation = await this.domainReservationService.update(
            reservationId,
            {
                endDate: DateUtil.date(extendDto.endDate).toDate(),
            },
            {
                relations: ['resource', 'participants', 'participants.employee'],
                withDeleted: true,
            },
        );

        // 3. 예약 종료 작업 재생성 (연장된 시간에 맞춰)
        if (updatedReservation.resource.type !== ResourceType.VEHICLE) {
            // 기존 종료 작업 삭제
            this.예약_종료작업을_삭제한다(reservationId);
            // 새로운 종료 작업 생성
            await this.예약_종료작업을_생성한다(updatedReservation);
        }

        // 4. 알림 처리 (예약 시간 변경 알림)
        if (updatedReservation.resource.notifyReservationChange) {
            try {
                const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);

                await this.notificationService.createNotification(
                    NotificationType.RESERVATION_TIME_CHANGED,
                    {
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
                );
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed in extendReservation');
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }

    // ==================== 크론 작업 처리 ====================
    async 크론_작업을_처리한다(): Promise<void> {
        const now = DateUtil.now().format();
        const notClosedReservations = await this.domainReservationService.findAll({
            where: {
                status: In([ReservationStatus.CONFIRMED, ReservationStatus.PENDING]),
                resource: {
                    type: Not(ResourceType.VEHICLE),
                },
                endDate: LessThanOrEqual(DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.domainReservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        }
    }

    // ==================== 시작 주행거리 처리 ====================
    async 시작주행거리를_처리한다(): Promise<void> {
        const now = DateUtil.now().format();
        const vehicleReservations = await this.domainReservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                resource: {
                    type: ResourceType.VEHICLE,
                },
                startDate: Between(
                    DateUtil.date(now).addMinutes(-2).toDate(),
                    DateUtil.date(now).addMinutes(2).toDate(),
                ),
            },
            relations: ['reservationVehicles', 'resource', 'resource.vehicleInfo'],
        });

        for (const reservation of vehicleReservations) {
            const reservationVehicle = reservation.reservationVehicles[0];
            const vehicleInfo = reservation.resource.vehicleInfo;
            await this.domainReservationVehicleService.update(reservationVehicle.reservationVehicleId, {
                startOdometer: vehicleInfo.totalMileage,
            });
        }
    }

    // ==================== 헬퍼 메서드들 ====================

    // 예약 종료 작업 생성
    async 예약_종료작업을_생성한다(reservation: Reservation): Promise<void> {
        const jobName = `closing-${reservation.reservationId}`;
        console.log('createReservationClosingJob', jobName);
        const executeTime = DateUtil.date(reservation.endDate).toDate();

        // 과거 시간 체크
        if (executeTime.getTime() <= Date.now()) {
            console.log(`ExecuteTime time ${executeTime} is in the past, skipping cron job creation`);
            await this.domainReservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
            return;
        }

        // 기존 Job이 있다면 삭제
        this.예약_종료작업을_삭제한다(reservation.reservationId);

        const job = new CronJob(executeTime, async () => {
            await this.domainReservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        job.start();
    }

    // 예약 종료 작업 삭제
    예약_종료작업을_삭제한다(reservationId: string): void {
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

    // ==================== 태스크 관련 메서드들 ====================

    /**
     * 사용자별 지연 반납 예약을 조회한다
     */
    async 지연반납_예약을_조회한다(employeeId: string): Promise<any[]> {
        const delayedReturnReservations = await this.domainReservationService.findAll({
            where: {
                participants: {
                    employeeId: employeeId,
                    type: ParticipantsType.RESERVER,
                },
                status: ReservationStatus.CONFIRMED,
                endDate: LessThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['participants', 'resource', 'reservationVehicles'],
        });

        return delayedReturnReservations;
    }

    /**
     * 모든 지연 반납 차량을 조회한다 (관리자용)
     */
    async 모든_지연반납_차량을_조회한다(): Promise<any[]> {
        const delayedReturnVehicles = await this.domainReservationService.findAll({
            where: {
                status: ReservationStatus.CONFIRMED,
                endDate: LessThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['resource', 'reservationVehicles', 'participants', 'participants.employee'],
        });

        return delayedReturnVehicles.map((reservation) => {
            const manager = reservation.participants.find(
                (participant) => participant.type === ParticipantsType.RESERVER,
            );
            return {
                type: '차량반납지연',
                title: `${reservation.resource.name} 반납 지연 중`,
                reservationId: reservation.reservationId,
                resourceId: reservation.resource.resourceId,
                resourceName: reservation.resource.name,
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                manager: manager
                    ? {
                          employeeId: manager.employee.employeeId,
                          name: manager.employee.name,
                          employeeNumber: manager.employee.employeeNumber,
                          department: manager.employee.department,
                          position: manager.employee.position,
                      }
                    : null,
            };
        });
    }
}
