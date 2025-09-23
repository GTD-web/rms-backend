import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { GroupedReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { FindOptionsWhere, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Reservation } from '@libs/entities';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class FindMyReservationListUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(
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

        const reservations = await this.reservationService.findAll(options);

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee', 'reservationVehicles'],
            withDeleted: true,
        });
        const count = await this.reservationService.count({
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
}
