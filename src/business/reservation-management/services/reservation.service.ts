import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';
import { ReservationContextService } from '@src/context/reservation/services/reservation.context.service';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationContextService: ReservationContextService,
        private readonly notificationContextService: NotificationContextService,
    ) {}

    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        return this.reservationContextService.예약목록을_조회한다(startDate, endDate, resourceType, resourceId, status);
    }

    async findCheckReservationList(
        query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.reservationContextService.확인필요_예약목록을_조회한다(query);
    }

    async findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationContextService.예약_상세를_조회한다(user, reservationId);
        const notifications = await this.notificationContextService.차량반납_알림을_조회한다(reservationId);
        return { ...reservation, notifications };
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        return this.reservationContextService.예약상태를_변경한다(reservationId, updateDto);
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        return this.reservationContextService.차량을_반납한다(user, reservationId, returnDto);
    }
}
