import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { CalendarResponseDto, CreateReservationResponseDto } from '../dtos/reservation-response.dto';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { UpdateReservationDto, ReturnVehicleDto, UpdateReservationTimeDto } from '../dtos/update-reservation.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { GroupedReservationResponseDto } from '../dtos/reservation-response.dto';
import { GroupedReservationWithResourceResponseDto } from '../dtos/reservation-response.dto';

// Usecases
import { CreateReservationUsecase } from '../usecases/create-reservation.usecase';
import { FindMyReservationListUsecase } from '../usecases/find-my-reservation-list.usecase';
import { FindResourceReservationListUsecase } from '../usecases/find-resource-reservation-list.usecase';
import { FindMyUsingReservationListUsecase } from '../usecases/find-my-using-reservation-list.usecase';
import { FindMyUpcomingReservationListUsecase } from '../usecases/find-my-upcoming-reservation-list.usecase';
import { FindMyAllSchedulesUsecase } from '../usecases/find-my-all-schedules.usecase';
import { FindReservationDetailUsecase } from '../usecases/find-reservation-detail.usecase';
import { UpdateReservationUsecase } from '../usecases/update-reservation.usecase';
import { UpdateReservationStatusUsecase } from '../usecases/update-reservation-status.usecase';
import { ReturnVehicleUsecase } from '../usecases/return-vehicle.usecase';
import { CheckReservationAccessUsecase } from '../usecases/check-reservation-access.usecase';
import { FindCalendarUsecase } from '../usecases/find-calendar.usecase';
import { ReservationQueryDto } from '../dtos/reservaion-query.dto';
import { ReservationManagementService } from '@src/context/reservation-management/services/reservation-management.service';
import { ReservationConflictService } from '@src/context/reservation-management/services/reservation-conflict.service';
import { ReservationValidationService } from '@src/context/reservation-management/services/reservation-validation.service';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class ReservationService {
    constructor(
        private readonly createReservationUsecase: CreateReservationUsecase,
        private readonly findMyReservationListUsecase: FindMyReservationListUsecase,
        private readonly findResourceReservationListUsecase: FindResourceReservationListUsecase,
        private readonly findMyUsingReservationListUsecase: FindMyUsingReservationListUsecase,
        private readonly findMyUpcomingReservationListUsecase: FindMyUpcomingReservationListUsecase,
        private readonly findMyAllSchedulesUsecase: FindMyAllSchedulesUsecase,
        private readonly findReservationDetailUsecase: FindReservationDetailUsecase,
        private readonly updateReservationUsecase: UpdateReservationUsecase,
        private readonly updateReservationStatusUsecase: UpdateReservationStatusUsecase,
        private readonly returnVehicleUsecase: ReturnVehicleUsecase,
        private readonly checkReservationAccessUsecase: CheckReservationAccessUsecase,
        private readonly findCalendarUsecase: FindCalendarUsecase,
        private readonly reservationConflictService: ReservationConflictService,
        private readonly reservationValidationService: ReservationValidationService,
        private readonly reservationManagementService: ReservationManagementService,
    ) {}

    async onModuleInit() {
        // const now = DateUtil.now().format();
        // const notClosedReservations = await this.reservationService.findAll({
        //     where: {
        //         status: In([ReservationStatus.CONFIRMED, ReservationStatus.PENDING]),
        //         resource: {
        //             type: Not(ResourceType.VEHICLE),
        //         },
        //         endDate: LessThanOrEqual(DateUtil.date(now).toDate()),
        //     },
        // });
        // for (const reservation of notClosedReservations) {
        //     await this.reservationService.update(reservation.reservationId, { status: ReservationStatus.CLOSED });
        // }
        // const reservations = await this.reservationService.findAll({
        //     where: {
        //         status: In([ReservationStatus.CONFIRMED, ReservationStatus.PENDING]),
        //         resource: {
        //             type: Not(ResourceType.VEHICLE),
        //         },
        //         endDate: MoreThan(DateUtil.date(now).toDate()),
        //     },
        // });
        // for (const reservation of reservations) {
        //     this.createReservationClosingJob.execute(reservation);
        // }
    }

    async create(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        return this.createReservationUsecase.execute(user, createDto);
    }

    async findMyReservationList(
        employeeId: string,
        page: number,
        limit: number,
        resourceType?: ResourceType,
        startDate?: string,
        endDate?: string,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.findMyReservationListUsecase.execute(employeeId, page, limit, resourceType, startDate, endDate);
    }

    async findResourceReservationList(
        employeeId: string,
        resourceId: string,
        page: number,
        limit: number,
        month?: string,
        isMine?: boolean,
    ): Promise<GroupedReservationWithResourceResponseDto> {
        return this.findResourceReservationListUsecase.execute(employeeId, resourceId, page, limit, month, isMine);
    }

    async findMyUsingReservationList(employeeId: string): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.findMyUsingReservationListUsecase.execute(employeeId);
    }

    async findMyUpcomingReservationList(
        employeeId: string,
        query: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.findMyUpcomingReservationListUsecase.execute(employeeId, query, resourceType);
    }

    async findMyAllSchedules(
        employeeId: string,
        query: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.findMyAllSchedulesUsecase.execute(employeeId, query, resourceType);
    }

    async findCalendar(user: Employee, query: ReservationQueryDto): Promise<CalendarResponseDto> {
        return this.findCalendarUsecase.execute(user, query);
    }

    async findReservationDetail(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        return this.findReservationDetailUsecase.execute(user, reservationId);
    }

    async updateReservation(reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto> {
        return this.updateReservationUsecase.execute(reservationId, updateDto);
    }

    async updateStatusCancel(reservationId: string): Promise<ReservationResponseDto> {
        return this.updateReservationStatusUsecase.execute(reservationId, { status: ReservationStatus.CANCELLED });
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        return this.returnVehicleUsecase.execute(user, reservationId, returnDto);
    }

    async checkReservationAccess(reservationId: string, employeeId: string): Promise<void> {
        await this.checkReservationAccessUsecase.execute(reservationId, employeeId);
    }

    async checkAvailablityToExtendReservation(employeeId: string, reservationId: string): Promise<boolean> {
        await this.reservationValidationService.validateReserverId(employeeId, reservationId);

        const reservation = await this.reservationValidationService.validateReservationId(reservationId);
        console.log('reservation', reservation);
        const isAvailable = await this.reservationValidationService.validateReservationTiming(
            DateUtil.date(reservation.endDate).addMinutes(-15).toDate(),
            reservation.endDate,
        );
        console.log('isAvailable', isAvailable);
        if (!isAvailable) {
            return false;
        }
        const isConflict = await this.reservationConflictService.isReservationTimeConflict(
            reservation.resourceId,
            DateUtil.date(reservation.endDate).toDate(),
            DateUtil.date(reservation.endDate).addMinutes(30).toDate(),
            reservationId,
        );
        console.log('isConflict', isConflict);
        return !isConflict;
    }

    async extendReservation(
        employeeId: string,
        reservationId: string,
        extendDto: UpdateReservationTimeDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationValidationService.validateReserverId(employeeId, reservationId);
        const updatedReservation = await this.reservationManagementService.updateReservationTime(
            reservationId,
            extendDto,
        );
        return new ReservationResponseDto(updatedReservation);
    }
}
