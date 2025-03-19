import { Controller, Get, Post, Delete, Body, Param, Patch, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { CreateReservationDto } from '../../../../../application/dtos/create-reservation.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import {
    CreateReservationResponseDto,
    ReservationResponseDto,
    UpdateReservationTimeDto,
    UpdateReservationParticipantsDto,
    UpdateReservationCcReceipientDto,
    UpdateReservationTitleDto,
    UpdateReservationStatusDto,
} from '@resource/dtos.index';
import { ReservationUsecase } from '../../../../../application/usecases/reservation.usecase';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import {
    ReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
} from '@resource/modules/reservation/application/dtos/reservation-response.dto';

@ApiTags('예약')
@Controller('reservations')
@ApiBearerAuth()
@Roles(Role.USER)
export class ReservationController {
    constructor(private readonly reservationUsecase: ReservationUsecase) {}

    @ApiTags('sprint0.1')
    @Post()
    @ApiOperation({ summary: '예약 생성' })
    @ApiDataResponse({
        description: '예약 생성 성공',
        type: CreateReservationResponseDto,
    })
    async create(
        @User() user: UserEntity,
        @Body() createDto: CreateReservationDto,
    ): Promise<CreateReservationResponseDto> {
        return this.reservationUsecase.makeReservation(user, createDto);
    }

    @ApiTags('sprint0.1')
    @Get('me')
    @ApiOperation({ summary: '내 예약 리스트 조회 #사용자/홈 ' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회 성공',
        type: [ReservationWithRelationsResponseDto],
    })
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    async findMyReservationList(
        @User() user: UserEntity,
        @Query('startDate') startDate?: string,
        @Query('resourceType') resourceType?: ResourceType,
    ): Promise<ReservationWithRelationsResponseDto[]> {
        return this.reservationUsecase.findMyReservationList(user.employeeId, startDate, resourceType);
    }

    @ApiTags('sprint0.1')
    @Get('me/current')
    @ApiOperation({ summary: '내 예약 현재 예약 조회 #사용자/자원예약/이용중 ' })
    @ApiDataResponse({
        description: '내 예약 현재 예약 조회 성공',
        type: ReservationWithRelationsResponseDto,
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, example: ResourceType.MEETING_ROOM })
    async findMyCurrentReservation(
        @User() user: UserEntity,
        @Query('resourceType') resourceType: ResourceType,
    ): Promise<ReservationWithRelationsResponseDto> {
        return this.reservationUsecase.findMyCurrentReservation(user.employeeId, resourceType);
    }

    @ApiTags('sprint0.1')
    @Get(':reservationId')
    @ApiOperation({ summary: '예약 조회 #사용자/예약상세페이지' })
    @ApiDataResponse({
        description: '예약 조회 성공',
        type: ReservationWithRelationsResponseDto,
    })
    async findOne(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
    ): Promise<ReservationWithRelationsResponseDto> {
        return this.reservationUsecase.findReservationDetail(user, reservationId);
    }

    @ApiTags('sprint0.1', 'sprint0.3')
    @Get()
    @ApiOperation({
        summary: '예약 리스트 조회 #사용자/자원캘린더 #사용자/자원예약/예약가능시간확인 #관리자/홈 #관리자/예약관리',
    })
    @ApiDataResponse({
        description: '예약 리스트 조회 성공',
        type: [ReservationWithResourceResponseDto],
    })
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'endDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'resourceId', type: String, required: false, example: '1241234-1234-1234-1234-123412341234' })
    @ApiQuery({
        name: 'status',
        enum: ReservationStatus,
        isArray: true,
        required: false,
        example: [ReservationStatus.CONFIRMED],
    })
    @ApiQuery({
        name: 'ReservationStatus',
        enum: ReservationStatus,
        required: false,
        example: [ReservationStatus.CONFIRMED],
    })
    async findReservationList(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('resourceType') resourceType?: ResourceType,
        @Query('resourceId') resourceId?: string,
        @Query('status', new ParseArrayPipe({ optional: true, separator: ',' }))
        status?: string[],
    ): Promise<ReservationWithResourceResponseDto[]> {
        return this.reservationUsecase.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/title')
    @ApiOperation({ summary: '예약 제목 수정' })
    @ApiDataResponse({
        description: '예약 제목 수정 성공',
        type: ReservationResponseDto,
    })
    async updateTitle(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationTitleDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateTitle(reservationId, updateDto);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/time')
    @ApiOperation({ summary: '예약 시간 수정' })
    @ApiDataResponse({
        description: '예약 시간 수정 성공',
        type: ReservationResponseDto,
    })
    async update(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationTimeDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateTime(reservationId, updateDto);
    }

    @ApiTags('sprint0.1', 'sprint0.3')
    @Patch(':reservationId/status')
    @ApiOperation({ summary: '예약 상태 수정 #사용자/예약상세페이지 #관리자/예약관리/예약상세' })
    @ApiDataResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    async updateStatus(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateStatus(
            reservationId,
            updateDto,
            user.employeeId,
            user.roles.includes(Role.RESOURCE_ADMIN),
        );
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/participants')
    @ApiOperation({ summary: '예약 참가자 수정' })
    @ApiDataResponse({
        description: '예약 참가자 수정 성공',
        type: ReservationResponseDto,
    })
    async updateParticipants(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationParticipantsDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateParticipants(reservationId, updateDto);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/cc-receipient')
    @ApiOperation({ summary: '예약 수신참조자 수정' })
    @ApiDataResponse({
        description: '예약 수신참조자 수정 성공',
        type: ReservationResponseDto,
    })
    async updateCcReceipient(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationCcReceipientDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateCcReceipient(reservationId, updateDto);
    }
}
