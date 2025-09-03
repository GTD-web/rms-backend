import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { CreateReservationResponseDto } from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DataSource, Raw } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { Employee, ReservationParticipant, ReservationVehicle } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { Role } from '@libs/enums/role-type.enum';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { FindConflictReservationUsecase } from './find-conflict-reservation.usecase';
import { CreateReservationClosingJobUsecase } from './create-reservation-closing-job.usecase';

@Injectable()
export class CreateReservationUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly participantService: DomainReservationParticipantService,
        private readonly reservationVehicleService: DomainReservationVehicleService,
        private readonly resourceService: DomainResourceService,
        private readonly employeeService: DomainEmployeeService,
        private readonly notificationService: NotificationService,
        private readonly dataSource: DataSource,
        private readonly findConflictReservationUsecase: FindConflictReservationUsecase,
        private readonly createReservationClosingJob: CreateReservationClosingJobUsecase,
    ) {}

    async execute(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        const conflicts = await this.findConflictReservationUsecase.execute(
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

        const resource = await this.resourceService.findOne({
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

            const reservation = await this.reservationService.create(createDto);
            reservation.startDate = DateUtil.date(createDto.startDate).toDate();
            reservation.endDate = DateUtil.date(createDto.endDate).toDate();

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

            if (resource.type !== ResourceType.VEHICLE) {
                await this.createReservationClosingJob.execute(savedReservation);
            }

            try {
                const reservationWithResource = await this.reservationService.findOne({
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
                    const systemAdmins = await this.employeeService.findAll({
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
}
