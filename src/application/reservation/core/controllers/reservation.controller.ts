import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import {
    ReservationWithRelationsResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
    CreateReservationResponseDto,
    CalendarResponseDto,
} from '../dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { UpdateReservationDto, ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { ReservationQueryDto } from '../dtos/reservaion-query.dto';

@ApiTags('2. 예약 ')
@Controller('v1/reservations')
@ApiBearerAuth()
@Roles(Role.USER)
export class UserReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @ApiOperation({ summary: '예약 생성' })
    @ApiDataResponse({
        description: '예약 생성 성공',
        type: CreateReservationResponseDto,
    })
    async create(
        @User() user: Employee,
        @Body() createDto: CreateReservationDto,
    ): Promise<CreateReservationResponseDto> {
        return this.reservationService.create(user, createDto);
    }

    // 내 모든 예약
    @Get('me')
    @ApiOperation({ summary: '내 예약 리스트 조회, 자원 타입별 ' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회',
        type: [GroupedReservationResponseDto],
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'startDate', required: false, example: '2025-01 / 2025-01-01' })
    @ApiQuery({ name: 'endDate', required: false, example: '2025-12 / 2025-12-31' })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findMyReservationList(
        @User() user: Employee,
        @Query('resourceType') resourceType?: ResourceType,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        const { page, limit } = query;
        return this.reservationService.findMyReservationList(
            user.employeeId,
            page,
            limit,
            resourceType,
            startDate,
            endDate,
        );
    }

    // 햄버거 메뉴 -> 자원목록 -> 자원상세 -> 내예약으로 들어간 후 나오는 리스트
    @Get('resource/:resourceId')
    @ApiOperation({ summary: '자원별 예약 리스트 조회' })
    @ApiDataResponse({
        description: '자원별 예약 리스트 조회',
        type: GroupedReservationWithResourceResponseDto,
    })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    @ApiQuery({ name: 'month', type: String, example: '2025-04' })
    @ApiQuery({ name: 'isMine', type: Boolean, required: false, example: true })
    async findResourceReservationList(
        @User() user: Employee,
        @Param('resourceId') resourceId: string,
        @Query() query?: PaginationQueryDto,
        @Query('month') month?: string,
        @Query('isMine') isMine?: boolean,
    ): Promise<GroupedReservationWithResourceResponseDto> {
        const { page, limit } = query;
        return this.reservationService.findResourceReservationList(
            user.employeeId,
            resourceId,
            page,
            limit,
            month,
            isMine,
        );
    }

    @Get('my-using')
    @ApiOperation({ summary: '내 이용중인 예약 리스트 조회' })
    @ApiDataResponse({
        description: '내 이용중인 예약 리스트 조회',
        type: [ReservationWithRelationsResponseDto],
    })
    async findMyUsingReservationList(
        @User() user: Employee,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.reservationService.findMyUsingReservationList(user.employeeId);
    }

    @Get('my-upcoming')
    @ApiOperation({ summary: '내 예약 리스트 조회' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회',
        type: [GroupedReservationResponseDto],
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findMyUpcomingReservationList(
        @User() user: Employee,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.reservationService.findMyUpcomingReservationList(user.employeeId, query, resourceType);
    }

    @Get('my-upcoming-schedules')
    @ApiOperation({ summary: '내 일정 리스트 조회 (예약자/참석자 모두 포함)' })
    @ApiDataResponse({
        description: '내 일정 리스트 조회 (예약자/참석자 모두 포함)',
        type: [GroupedReservationResponseDto],
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findMyUpcomingSchedules(
        @User() user: Employee,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.reservationService.findMyAllSchedules(user.employeeId, query, resourceType);
    }

    @Get('calendar')
    @ApiOperation({ summary: '캘린더 조회' })
    @ApiDataResponse({
        description: '캘린더 조회 성공',
        type: CalendarResponseDto,
    })
    @ApiQuery({ name: 'startDate', example: '2025-01-01' })
    @ApiQuery({ name: 'endDate', example: '2025-12-31' })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'isMine', type: Boolean, required: false, example: true })
    @ApiQuery({ name: 'isMySchedules', type: Boolean, required: false, example: true })
    async findCalendar(
        @User() user: Employee,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('resourceType') resourceType?: ResourceType,
        @Query('isMine') isMine?: boolean,
        @Query('isMySchedules') isMySchedules?: boolean,
    ): Promise<CalendarResponseDto> {
        const query = { startDate, endDate, resourceType, isMine, isMySchedules };
        return this.reservationService.findCalendar(user, query);
    }

    @Get(':reservationId')
    @ApiOperation({ summary: '예약 상세 조회 #사용자/예약상세페이지' })
    @ApiDataResponse({
        description: '예약 상세 조회 성공',
        type: ReservationWithRelationsResponseDto,
    })
    async findOne(
        @User() user: Employee,
        @Param('reservationId') reservationId: string,
    ): Promise<ReservationWithRelationsResponseDto> {
        return this.reservationService.findReservationDetail(user, reservationId);
    }

    @Patch(':reservationId')
    @ApiOperation({ summary: '예약 수정' })
    @ApiDataResponse({
        description: '예약 수정 성공',
        type: ReservationResponseDto,
    })
    async updateReservation(
        @User() user: Employee,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationService.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationService.updateReservation(reservationId, updateDto);
    }

    @Patch(':reservationId/status/cancel')
    @ApiOperation({ summary: '예약 취소 #사용자/예약상세페이지' })
    @ApiDataResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    async updateStatusCancel(
        @User() user: Employee,
        @Param('reservationId') reservationId: string,
    ): Promise<ReservationResponseDto> {
        await this.reservationService.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationService.updateStatusCancel(reservationId);
    }

    @Patch(':reservationId/return-vehicle')
    @ApiOperation({ summary: '차량 반납 #사용자/자원예약/차량반납' })
    @ApiDataResponse({
        status: 200,
        description: '차량 반납 성공',
    })
    async returnVehicle(
        @User() user: Employee,
        @Param('reservationId') reservationId: string,
        @Body() returnDto: ReturnVehicleDto,
    ): Promise<boolean> {
        return this.reservationService.returnVehicle(user, reservationId, returnDto);
    }
}
