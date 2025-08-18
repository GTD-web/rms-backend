import { Injectable } from '@nestjs/common';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { ReservationVehicle } from '@libs/entities/reservation-vehicle.entity';

@Injectable()
export class ResourceVehicleInfoService {
    constructor(private readonly domainReservationVehicleService: DomainReservationVehicleService) {}

    async 반납_리스트를_조회한다(vehicleInfoId: string): Promise<ReservationVehicle[]> {
        const reservationVehicles = await this.domainReservationVehicleService.findAll({
            where: { isReturned: true, vehicleInfoId },
            order: {
                returnedAt: 'DESC',
            },
        });
        return reservationVehicles;
    }

    async 반납_상세정보를_조회한다(reservationVehicleId: string): Promise<ReservationVehicle> {
        const reservationVehicle =
            await this.domainReservationVehicleService.findByReservationVehicleId(reservationVehicleId);
        return reservationVehicle;
    }
}
