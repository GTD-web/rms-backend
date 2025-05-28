import { Injectable } from '@nestjs/common';
import { Employee, User as UserEntity } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { FindReservationListUsecase } from '../usecases/find-reservation-list.usecase';
import { FindCheckReservationListUsecase } from '../usecases/find-check-reservation-list.usecase';
import { FindReservationDetailUsecase } from '../usecases/find-reservation-detail.usecase';
import { UpdateReservationStatusUsecase } from '../usecases/update-reservation-status.usecase';

@Injectable()
export class AdminReservationService {
    constructor(
        private readonly findReservationListUsecase: FindReservationListUsecase,
        private readonly findCheckReservationListUsecase: FindCheckReservationListUsecase,
        private readonly findReservationDetailUsecase: FindReservationDetailUsecase,
        private readonly updateReservationStatusUsecase: UpdateReservationStatusUsecase,
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
        return this.findReservationDetailUsecase.execute(user, reservationId);
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        return this.updateReservationStatusUsecase.execute(reservationId, updateDto);
    }
}
