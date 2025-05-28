import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DataSource } from 'typeorm';
import { Employee } from '@libs/entities';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { NotificationService } from '@src/application/notification/notification.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
@Injectable()
export class ReturnVehicleUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly reservationVehicleService: DomainReservationVehicleService,
        private readonly resourceService: DomainResourceService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly notificationService: NotificationService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
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
            const reservationVehicles = await this.reservationVehicleService.findAll({
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

            await this.reservationService.update(
                reservationId,
                {
                    status: ReservationStatus.CLOSED,
                },
                { queryRunner },
            );

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

            await this.resourceService.update(
                reservation.resource.resourceId,
                { location: returnDto.location },
                { queryRunner },
            );

            await this.vehicleInfoService.update(
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
            this.notificationService.createNotification(
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
}
