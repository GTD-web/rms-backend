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

    // ==================== 예약 생성 ====================
    // async create(user: Employee, createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
    //     return this.reservationContextService.예약을_생성한다(user, createDto);
    // }

    // ==================== 관리자 전용 메서드들 ====================
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

    // ==================== 사용자 메서드들 ====================
    // async findMyReservationList(
    //     employeeId: string,
    //     page?: number,
    //     limit?: number,
    //     resourceType?: ResourceType,
    //     startDate?: string,
    //     endDate?: string,
    // ): Promise<PaginationData<GroupedReservationResponseDto>> {
    //     return this.reservationContextService.내_예약목록을_조회한다(
    //         employeeId,
    //         page,
    //         limit,
    //         resourceType,
    //         startDate,
    //         endDate,
    //     );
    // }

    // async findResourceReservationList(
    //     employeeId: string,
    //     resourceId: string,
    //     page?: number,
    //     limit?: number,
    //     month?: string,
    //     isMine?: boolean,
    // ): Promise<GroupedReservationWithResourceResponseDto> {
    //     return this.reservationContextService.자원별_예약목록을_조회한다(
    //         employeeId,
    //         resourceId,
    //         page,
    //         limit,
    //         month,
    //         isMine,
    //     );
    // }

    // async findMyUsingReservationList(employeeId: string): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
    //     return this.reservationContextService.내_이용중인_예약목록을_조회한다(employeeId);
    // }

    // async findMyUpcomingReservationList(
    //     employeeId: string,
    //     query?: PaginationQueryDto,
    //     resourceType?: ResourceType,
    // ): Promise<PaginationData<GroupedReservationResponseDto>> {
    //     return this.reservationContextService.내_다가오는_예약목록을_조회한다(employeeId, query, resourceType);
    // }

    // async findMyUpcomingSchedules(
    //     employeeId: string,
    //     query?: PaginationQueryDto,
    //     resourceType?: ResourceType,
    // ): Promise<PaginationData<GroupedReservationResponseDto>> {
    //     return this.reservationContextService.내_모든_일정을_조회한다(employeeId, query, resourceType);
    // }

    // async findCalendar(user: Employee, query: ReservationQueryDto): Promise<CalendarResponseDto> {
    //     return this.reservationContextService.캘린더를_조회한다(user, query);
    // }

    async findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationContextService.예약_상세를_조회한다(user, reservationId);
        const notifications = await this.notificationContextService.차량반납_알림을_조회한다(reservationId);
        return { ...reservation, notifications };
    }

    // ==================== 예약 수정 ====================
    // async updateReservation(
    //     user: Employee,
    //     reservationId: string,
    //     updateDto: UpdateReservationDto,
    // ): Promise<ReservationResponseDto> {
    //     await this.reservationContextService.예약_접근권한을_확인한다(reservationId, user.employeeId);
    //     return this.reservationContextService.예약을_수정한다(reservationId, updateDto);
    // }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        return this.reservationContextService.예약상태를_변경한다(reservationId, updateDto);
    }

    // async updateStatusCancel(user: Employee, reservationId: string): Promise<ReservationResponseDto> {
    //     await this.reservationContextService.예약_접근권한을_확인한다(reservationId, user.employeeId);
    //     return this.reservationContextService.예약을_취소한다(reservationId);
    // }

    // ==================== 차량 반납 ====================
    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        return this.reservationContextService.차량을_반납한다(user, reservationId, returnDto);
    }

    // ==================== 예약 연장 ====================
    // async checkExtendable(employeeId: string, reservationId: string): Promise<boolean> {
    //     return this.reservationContextService.예약_연장가능여부를_확인한다(employeeId, reservationId);
    // }

    // async extendReservation(
    //     employeeId: string,
    //     reservationId: string,
    //     extendDto: UpdateReservationTimeDto,
    // ): Promise<ReservationResponseDto> {
    //     return this.reservationContextService.예약을_연장한다(employeeId, reservationId, extendDto);
    // }
}
