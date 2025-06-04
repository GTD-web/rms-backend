import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { GroupedReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { FindOptionsWhere, In, MoreThanOrEqual } from 'typeorm';
import { Reservation } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class FindMyUpcomingReservationListUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(
        employeeId: string,
        query?: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        const { page, limit } = query;
        const today = DateUtil.date(DateUtil.now().format('YYYY-MM-DD 00:00:00')).toDate();
        const where: FindOptionsWhere<Reservation> = {
            participants: { employeeId, type: ParticipantsType.RESERVER },
            endDate: MoreThanOrEqual(today),
        };
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        const options: IRepositoryOptions<Reservation> = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };
        const reservations = await this.reservationService.findAll(options);
        const count = reservations.length;

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            skip: (page - 1) * limit,
            take: limit,
            withDeleted: true,
        });

        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});

        const groupedReservationsResponse = Object.entries(groupedReservations).map(([date, reservations]) => ({
            date,
            reservations: (reservations as Reservation[]).map(
                (reservation) => new ReservationWithRelationsResponseDto(reservation),
            ),
        }));

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
