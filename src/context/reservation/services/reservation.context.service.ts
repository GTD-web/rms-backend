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
export class ReservationContextService {
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

    async 예약을_조회한다(reservationId: string): Promise<Reservation> {
        return await this.domainReservationService.findOne({
            where: { reservationId },
            withDeleted: true,
        });
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
