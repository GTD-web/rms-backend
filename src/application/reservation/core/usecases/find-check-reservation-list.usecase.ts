import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { FindOptionsWhere, Between } from 'typeorm';
import { Reservation } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Injectable()
export class FindCheckReservationListUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(query: PaginationQueryDto): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const { page, limit } = query;
        // 숙소 - 예약 승인 대기
        // 차량 - 예약 확정, 반납 완료
        const where: FindOptionsWhere<Reservation>[] = [
            {
                status: ReservationStatus.PENDING,
                resource: {
                    type: ResourceType.ACCOMMODATION,
                },
            },
        ];

        const options: IRepositoryOptions<Reservation> = {
            where,
            relations: ['resource', 'reservationVehicles', 'participants', 'participants.employee'],
            withDeleted: true,
        };

        const reservations = await this.reservationService.findAll(options);
        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithRelationsResponseDto(reservation),
        );

        return {
            items: reservationResponseDtos,
            meta: {
                total: reservations.length,
                page: 1,
                limit: reservations.length,
                hasNext: false,
            },
        };
    }
}
