import { Injectable, BadRequestException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { FindOptionsWhere, MoreThan, LessThan, In } from 'typeorm';
import { Reservation } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Injectable()
export class FindReservationListUsecase {
    constructor(private readonly reservationService: DomainReservationService) {}

    async execute(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        }
        if (status && status.filter((s) => ReservationStatus[s]).length === 0) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESOURCE.INVALID_STATUS);
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        let where: FindOptionsWhere<Reservation> = {};

        if (status && status.length > 0) {
            where.status = In(status);
        }
        if (resourceType) {
            where.resource = {
                type: resourceType as ResourceType,
            };
        }
        if (resourceId) {
            where.resource = {
                resourceId,
            };
        }
        if (startDate && endDate) {
            // 예약 기간이 검색 범위와 겹치는 경우를 찾음
            // (예약 시작일 <= 검색 종료일) AND (예약 종료일 >= 검색 시작일)
            where = {
                ...where,
                startDate: LessThan(DateUtil.date(regex.test(endDate) ? endDate : endDate + ' 23:59:59').toDate()),
                endDate: MoreThan(DateUtil.date(regex.test(startDate) ? startDate : startDate + ' 00:00:00').toDate()),
            };
        }

        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const reservationResponseDtos = reservations.map(
            (reservation) => new ReservationWithRelationsResponseDto(reservation),
        );
        return reservationResponseDtos;
    }
}
