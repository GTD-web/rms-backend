import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { FileContextService } from '../../file/services/file.context.service';
import { DataSource, QueryRunner } from 'typeorm';
import { Employee, Reservation } from '@libs/entities';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus, ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DateUtil } from '@libs/utils/date.util';
import { In, Raw, FindOptionsWhere, Between, MoreThan, LessThan, LessThanOrEqual, Not } from 'typeorm';

import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '@src/business.dto.index';
// import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ReservationResponseDto } from '@src/business.dto.index';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';

@Injectable()
export class ReservationContextService {
    constructor(
        private readonly domainReservationService: DomainReservationService,
        private readonly domainResourceService: DomainResourceService,
        private readonly domainNotificationService: DomainNotificationService,
        private readonly domainEmployeeNotificationService: DomainEmployeeNotificationService,
        private readonly domainReservationVehicleService: DomainReservationVehicleService,
        private readonly domainVehicleInfoService: DomainVehicleInfoService,
        private readonly domainFileService: DomainFileService,
        private readonly fileContextService: FileContextService,
        private readonly dataSource: DataSource,
        private readonly domainScheduleParticipantService: DomainScheduleParticipantService,
    ) {}

    // 기존

    async 예약목록을_조회한다(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        } else if ((startDate && !endDate) || (!startDate && endDate)) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_REQUIRED);
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
        console.log(reservation);
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some(
            (reserver) => reserver.employeeId === user.employeeId,
        );

        reservationResponseDto.returnable =
            (reservationResponseDto.resource as any).type === ResourceType.VEHICLE
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

        const responseDto = new ReservationResponseDto();
        Object.assign(responseDto, updatedReservation);
        return responseDto;
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
                    ...(returnDto.parkingCoordinates && { parkingCoordinates: returnDto.parkingCoordinates }),
                },
                { queryRunner },
            );

            const vehicleInfoId = reservation.resource.vehicleInfo.vehicleInfoId;

            await this.domainResourceService.update(
                reservation.resource.resourceId,
                { location: returnDto.location },
                { queryRunner },
            );

            // 파일 ID 배열 준비 (기본값 빈 배열)
            if (!returnDto.parkingLocationImages) returnDto.parkingLocationImages = [];
            if (!returnDto.odometerImages) returnDto.odometerImages = [];
            if (!returnDto.indoorImages) returnDto.indoorImages = [];

            // 모든 파일 ID들을 수집
            const allFileIds = [
                ...returnDto.parkingLocationImages,
                ...returnDto.odometerImages,
                ...returnDto.indoorImages,
            ];

            // 파일들을 임시에서 영구로 변경
            if (allFileIds.length > 0) {
                await this.fileContextService.파일들을_영구로_변경한다(allFileIds, queryRunner);
            }

            // 차량예약에 파일들을 연결
            await this.fileContextService.차량예약에_파일들을_연결한다(
                reservationVehicle.reservationVehicleId,
                {
                    parkingLocationImages: returnDto.parkingLocationImages,
                    odometerImages: returnDto.odometerImages,
                    indoorImages: returnDto.indoorImages,
                },
                queryRunner,
            );

            // 파일 ID들을 filePath로 변환
            let parkingLocationFilePaths: string[] = [];
            let odometerFilePaths: string[] = [];
            let indoorFilePaths: string[] = [];

            if (returnDto.parkingLocationImages.length > 0) {
                const files = await this.domainFileService.findAll({
                    where: { fileId: In(returnDto.parkingLocationImages) },
                });
                parkingLocationFilePaths = files.map((file) => file.filePath);
            }

            if (returnDto.odometerImages.length > 0) {
                const files = await this.domainFileService.findAll({
                    where: { fileId: In(returnDto.odometerImages) },
                });
                odometerFilePaths = files.map((file) => file.filePath);
            }

            if (returnDto.indoorImages.length > 0) {
                const files = await this.domainFileService.findAll({
                    where: { fileId: In(returnDto.indoorImages) },
                });
                indoorFilePaths = files.map((file) => file.filePath);
            }

            // 차량 정보 업데이트 (filePath 및 좌표 포함)
            await this.domainVehicleInfoService.update(
                vehicleInfoId,
                {
                    totalMileage: returnDto.totalMileage,
                    leftMileage: returnDto.leftMileage,
                    parkingLocationImages: parkingLocationFilePaths,
                    odometerImages: odometerFilePaths,
                    indoorImages: indoorFilePaths,
                    ...(returnDto.parkingCoordinates && { parkingCoordinates: returnDto.parkingCoordinates }),
                },
                { queryRunner },
            );

            // 차량정보에 파일들을 연결 (덮어쓰기)
            await this.fileContextService.차량정보에_파일들을_연결한다(
                vehicleInfoId,
                {
                    parkingLocationImages: returnDto.parkingLocationImages,
                    odometerImages: returnDto.odometerImages,
                    indoorImages: returnDto.indoorImages,
                },
                queryRunner,
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

    // ==================== 크론 작업 처리 ====================
    async 예약을_종료한다(): Promise<void> {
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

    // ==================== 태스크 관련 메서드들 ====================

    /**
     * 사용자별 지연 반납 예약을 조회한다 (기존 메서드)
     */
    async 지연반납_예약을_조회한다(reservationIds: string[]): Promise<any[]> {
        const delayedReturnReservations = await this.domainReservationService.findAll({
            where: {
                reservationId: In(reservationIds),
                status: ReservationStatus.CONFIRMED,
                endDate: LessThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['resource', 'reservationVehicles'],
        });

        return delayedReturnReservations;
    }

    /**
     * 지연반납 확인을 위한 예약 상세정보만 조회한다 (최적화된 버전)
     * @param reservationIds 확인할 예약 ID 목록
     * @returns reservationVehicles 정보를 포함한 예약 목록
     */
    async 지연반납_예약_상세정보를_조회한다(reservationIds: string[]): Promise<any[]> {
        if (reservationIds.length === 0) {
            return [];
        }

        // 이미 기본 조건은 메모리에서 체크했으므로, reservationVehicles 정보만 추가로 조회
        const reservationsWithVehicles = await this.domainReservationService.findAll({
            where: {
                reservationId: In(reservationIds),
            },
            relations: ['reservationVehicles', 'resource'], // 필요한 관계 정보만 조회
            order: { endDate: 'ASC' },
        });

        return reservationsWithVehicles;
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
            order: { endDate: 'ASC' },
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

    // 신규
    // ==================== 예약 생성 ====================
    async 자원예약이_가능한지_확인한다(resourceId: string, startDate: Date, endDate: Date): Promise<boolean> {
        return await this.domainReservationService.checkReservationConflicts(resourceId, startDate, endDate);
    }

    async 자원예약을_생성한다(reservationData: CreateReservationDto, queryRunner?: QueryRunner): Promise<Reservation> {
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

    /**
     * 자원의 특정 날짜 범위 내 모든 예약을 조회한다
     */
    async 자원의_날짜범위_예약을_조회한다(
        resourceId: string,
        startDate: Date,
        endDate: Date,
        excludeReservationId?: string,
    ): Promise<Reservation[]> {
        return await this.domainReservationService.findAll({
            where: {
                resourceId,
                ...(excludeReservationId && { reservationId: Not(excludeReservationId) }),
                startDate: LessThan(endDate),
                endDate: MoreThan(startDate),
                status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            },
            order: { startDate: 'ASC' },
        });
    }

    /**
     * 30분 단위 시간 슬롯별로 예약 가능 여부를 계산한다
     */
    시간슬롯별_예약가능여부를_계산한다(reservations: Reservation[], slotStartTime: Date, slotEndTime: Date): boolean {
        return !reservations.some((reservation) => {
            const reservationStart = new Date(reservation.startDate);
            const reservationEnd = new Date(reservation.endDate);

            // 겹치는 조건:
            // 1. 슬롯 시작이 예약 시간 내에 있거나
            // 2. 슬롯 종료가 예약 시간 내에 있거나
            // 3. 슬롯이 예약 시간을 완전히 포함하거나
            return (
                (slotStartTime >= reservationStart && slotStartTime < reservationEnd) ||
                (slotEndTime > reservationStart && slotEndTime <= reservationEnd) ||
                (slotStartTime < reservationStart && slotEndTime > reservationEnd)
            );
        });
    }
}
