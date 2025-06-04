import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Reservation } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class FindMyUsingReservationListUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(employeeId: string): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        // 현재 이용중인 예약 조회
        const where: FindOptionsWhere<Reservation>[] = [
            {
                participants: { employeeId, type: ParticipantsType.RESERVER },
                resource: { type: ResourceType.VEHICLE },
                status: ReservationStatus.CONFIRMED,
                startDate: LessThanOrEqual(DateUtil.date(DateUtil.now().format()).toDate()),
                endDate: MoreThanOrEqual(DateUtil.date(DateUtil.now().format()).toDate()),
            },
            {
                participants: { employeeId, type: ParticipantsType.RESERVER },
                status: ReservationStatus.CLOSED,
                reservationVehicles: {
                    isReturned: false,
                },
            },
        ];
        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'reservationVehicles', 'participants'],
            order: {
                startDate: 'ASC',
            },
            withDeleted: true,
        });
        reservations.sort((a, b) => {
            if (a.status === ReservationStatus.CONFIRMED) {
                return -1;
            }
            return 1;
        });
        return {
            items: reservations.map((reservation) => new ReservationWithRelationsResponseDto(reservation)),
            meta: {
                total: reservations.length,
                page: 1,
                limit: reservations.length,
                hasNext: false,
            },
        };
    }
}
