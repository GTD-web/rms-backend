import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { CalendarResponseDto, ReservationResponseDto } from '../dtos/reservation-response.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { FindReservationListUsecase } from '../usecases/find-reservation-list.usecase';
import { FindCheckReservationListUsecase } from '../usecases/find-check-reservation-list.usecase';
import { FindReservationDetailUsecase } from '../usecases/find-reservation-detail.usecase';
import { UpdateReservationStatusUsecase } from '../usecases/update-reservation-status.usecase';
import { ReturnVehicleUsecase } from '../usecases/return-vehicle.usecase';
import { FindDelayedVehicleNotificationsUsecase } from '../usecases/find-dealyed-vehicle-notifications.usecase';
import { FindCalendarUsecase } from '../usecases/find-calendar.usecase';
import { DomainReservationVehicleService } from '@src/domain/reservation-vehicle/reservation-vehicle.service';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class AdminReservationService {
    constructor(
        private readonly findReservationListUsecase: FindReservationListUsecase,
        private readonly findCheckReservationListUsecase: FindCheckReservationListUsecase,
        private readonly findReservationDetailUsecase: FindReservationDetailUsecase,
        private readonly updateReservationStatusUsecase: UpdateReservationStatusUsecase,
        private readonly returnVehicleUsecase: ReturnVehicleUsecase,
        private readonly findDelayedVehicleNotificationsUsecase: FindDelayedVehicleNotificationsUsecase,
        private readonly findCalendarUsecase: FindCalendarUsecase,
        private readonly reservationVehicleService: DomainReservationVehicleService,
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

    async findCalendar(
        user: Employee,
        startDate: string,
        endDate: string,
        resourceType?: ResourceType,
    ): Promise<CalendarResponseDto> {
        const reservations = await this.findCalendarUsecase.execute(user, startDate, endDate, resourceType, false);
        for (const reservation of reservations.reservations) {
            const type = reservation.resource.type;
            if (type === ResourceType.VEHICLE) {
                const reservationVehicle = await this.reservationVehicleService.findOne({
                    where: { reservationId: reservation.reservationId },
                    relations: ['vehicleInfo'],
                });
                if (reservation.endDate < DateUtil.now().format() && !reservationVehicle.isReturned) {
                    reservation.isDelayed = true;
                } else {
                    reservation.isDelayed = false;
                }
            }
        }
        return reservations;
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        return this.updateReservationStatusUsecase.execute(reservationId, updateDto);
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        return this.returnVehicleUsecase.execute(user, reservationId, returnDto);
    }
}
