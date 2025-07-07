import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { FindReservationListUsecase } from '../usecases/find-reservation-list.usecase';
import { FindCheckReservationListUsecase } from '../usecases/find-check-reservation-list.usecase';
import { FindReservationDetailUsecase } from '../usecases/find-reservation-detail.usecase';
import { UpdateReservationStatusUsecase } from '../usecases/update-reservation-status.usecase';
import { ReturnVehicleUsecase } from '../usecases/return-vehicle.usecase';
import { FindDelayedVehicleNotificationsUsecase } from '../usecases/find-dealyed-vehicle-notifications.usecase';

@Injectable()
export class AdminReservationService {
    constructor(
        private readonly findReservationListUsecase: FindReservationListUsecase,
        private readonly findCheckReservationListUsecase: FindCheckReservationListUsecase,
        private readonly findReservationDetailUsecase: FindReservationDetailUsecase,
        private readonly updateReservationStatusUsecase: UpdateReservationStatusUsecase,
        private readonly returnVehicleUsecase: ReturnVehicleUsecase,
        private readonly findDelayedVehicleNotificationsUsecase: FindDelayedVehicleNotificationsUsecase,
    ) {}

    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        return this.findReservationListUsecase.execute(startDate, endDate, resourceType, resourceId, status);
    }

    async findCheckReservationList(
        query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.findCheckReservationListUsecase.execute(query);
    }

    async findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.findReservationDetailUsecase.execute(user, reservationId);
        const notifications = await this.findDelayedVehicleNotificationsUsecase.execute(reservationId);
        return { ...reservation, notifications };
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        return this.updateReservationStatusUsecase.execute(reservationId, updateDto);
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        return this.returnVehicleUsecase.execute(user, reservationId, returnDto);
    }
}
