import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { LessThanOrEqual, Not, In } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';

@Injectable()
export class HandleCronUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(): Promise<void> {
        const now = DateUtil.now().format();
        const notClosedReservations = await this.reservationService.findAll({
            where: {
                status: In([ReservationStatus.CONFIRMED, ReservationStatus.PENDING]),
                resource: {
                    type: Not(ResourceType.VEHICLE),
                },
                endDate: LessThanOrEqual(DateUtil.date(now).toDate()),
            },
        });
        for (const reservation of notClosedReservations) {
            await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        }
    }
}
