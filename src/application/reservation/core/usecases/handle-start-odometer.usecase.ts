import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { LessThanOrEqual, Not, In, MoreThanOrEqual, Between } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';

@Injectable()
export class HandleStartOdometerUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly reservationVehicleService: DomainReservationVehicleService,
    ) {}

    async execute(): Promise<void> {
        const now = DateUtil.now().format();
        const vehicleReservations = await this.reservationService.findAll({
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
            await this.reservationVehicleService.update(reservationVehicle.reservationVehicleId, {
                startOdometer: vehicleInfo.totalMileage,
            });
        }
    }
}
