import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import {
    GroupedReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
} from '../dtos/reservation-response.dto';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { FindOptionsWhere, In, Raw } from 'typeorm';
import { Reservation } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceResponseDto } from '@resource/dtos.index';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class FindResourceReservationListUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly resourceService: DomainResourceService,
    ) {}

    async execute(
        employeeId: string,
        resourceId: string,
        page?: number,
        limit?: number,
        month?: string,
        isMine?: boolean,
    ): Promise<GroupedReservationWithResourceResponseDto> {
        // 이번 달의 시작일과 마지막일 계산
        const monthStart = `${month}-01 00:00:00`;
        const lastDay = DateUtil.date(month).getLastDayOfMonth().getDate();
        const monthEnd = `${month}-${lastDay} 23:59:59`;

        const monthStartDate = DateUtil.date(monthStart).toDate();
        const monthEndDate = DateUtil.date(monthEnd).toDate();

        // Raw SQL을 사용하여 복잡한 날짜 조건 처리
        // 1. 시작일이 이번 달 안에 있는 경우
        // 2. 종료일이 이번 달 안에 있는 경우
        // 3. 시작일이 이번 달 이전이고 종료일이 이번 달 이후인 경우
        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :monthStartDate AND :monthEndDate OR
              "Reservation"."endDate" BETWEEN :monthStartDate AND :monthEndDate OR
              (${alias} <= :monthStartDate AND "Reservation"."endDate" >= :monthEndDate))`,
            { monthStartDate, monthEndDate },
        );

        const where: FindOptionsWhere<Reservation> = {
            startDate: dateCondition,
            resourceId: resourceId,
        };

        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
        });
        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        if (isMine) {
            where.participants = { employeeId, type: ParticipantsType.RESERVER };
        }

        const options: IRepositoryOptions<Reservation> = {
            where,
        };

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }

        const reservations = await this.reservationService.findAll(options);
        const count = await this.reservationService.count({ where });

        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: In(reservations.map((r) => r.reservationId)),
            },
            relations: ['participants', 'participants.employee'],
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
            resource: new ResourceResponseDto(resource),
            groupedReservations: groupedReservationsResponse,
        };
    }
}
