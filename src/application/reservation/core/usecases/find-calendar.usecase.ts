import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Between, In, Raw } from 'typeorm';
import { CalendarResponseDto } from '../dtos/reservation-response.dto';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReservationWithResourceResponseDto } from '../dtos/reservation-response.dto';

@Injectable()
export class FindCalendarUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(startDate: string, endDate: string): Promise<CalendarResponseDto> {
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
            { startDateObj, endDateObj },
        );

        const where = {
            startDate: dateCondition,
            status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
        };

        const reservations = await this.reservationService.findAll({
            where: where,
            relations: ['resource'],
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
            },
        });

        return {
            reservations: reservations.map((reservation) => new ReservationWithResourceResponseDto(reservation)),
        };
    }
}
