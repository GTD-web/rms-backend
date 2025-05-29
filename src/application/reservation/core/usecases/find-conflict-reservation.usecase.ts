import { Injectable } from '@nestjs/common';
import { Reservation } from '@libs/entities';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { MoreThan, Not, In, LessThan } from 'typeorm';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Injectable()
export class FindConflictReservationUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(resourceId: string, startDate: Date, endDate: Date, reservationId?: string): Promise<Reservation[]> {
        return await this.reservationService.findAll({
            where: {
                resourceId,
                ...(reservationId && { reservationId: Not(reservationId) }),
                startDate: LessThan(endDate),
                endDate: MoreThan(startDate),
                status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            },
        });
    }
}
