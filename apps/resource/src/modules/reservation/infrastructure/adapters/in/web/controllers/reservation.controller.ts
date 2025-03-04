import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
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
import { ReturnVehicleDto } from '@resource/modules/resource/common/application/dtos/return-vehicle.dto';

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
    async create(@Body() createDto: CreateReservationDto): Promise<CreateReservationResponseDto> {
        return this.reservationUsecase.makeReservation(createDto);
    }

    @ApiTags('sprint0.1')
    @Get('me')
    @ApiOperation({ summary: '내 예약 리스트 조회 #내예약 ' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회 성공',
        type: [ReservationResponseDto],
    })
    async findMyReservationList(@User() user: UserEntity): Promise<ReservationResponseDto[]> {
        return this.reservationUsecase.findMyReservationList(user.employeeId);
    }

    @ApiTags('sprint0.1')
    @Get(':reservationId')
    @ApiOperation({ summary: '예약 조회 #예약 상세 페이지' })
    @ApiDataResponse({
        description: '예약 조회 성공',
        type: ReservationResponseDto,
    })
    async findOne(@Param('reservationId') reservationId: string): Promise<ReservationResponseDto> {
        return this.reservationUsecase.findReservationDetail(reservationId);
    }

    @ApiTags('sprint0.1')
    @Get()
    @ApiOperation({ summary: '예약 리스트 조회 #내예약 #예약가능시간모달 #자원캘린더' })
    @ApiDataResponse({
        description: '예약 리스트 조회 성공',
        type: [ReservationResponseDto],
    })
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'endDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'resourceId', type: String, required: false, example: '1241234-1234-1234-1234-123412341234' })
    async findReservationList(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('resourceType') resourceType?: ResourceType,
        @Query('resourceId') resourceId?: string,
    ): Promise<ReservationResponseDto[]> {
        return this.reservationUsecase.findReservationList(startDate, endDate, resourceType, resourceId);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/title')
    @ApiOperation({ summary: '예약 제목 수정' })
    @ApiDataResponse({
        description: '예약 제목 수정 성공',
        type: ReservationResponseDto,
    })
    async updateTitle(
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationTitleDto,
    ): Promise<ReservationResponseDto> {
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
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationTimeDto,
    ): Promise<ReservationResponseDto> {
        return this.reservationUsecase.updateTime(reservationId, updateDto);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/status')
    @ApiOperation({ summary: '예약 상태 수정' })
    @ApiDataResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    async updateStatus(
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        return this.reservationUsecase.updateStatus(reservationId, updateDto);
    }

    @ApiTags('sprint0.1')
    @Patch(':reservationId/participants')
    @ApiOperation({ summary: '예약 참가자 수정' })
    @ApiDataResponse({
        description: '예약 참가자 수정 성공',
        type: ReservationResponseDto,
    })
    async updateParticipants(
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationParticipantsDto,
    ): Promise<ReservationResponseDto> {
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
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationCcReceipientDto,
    ): Promise<ReservationResponseDto> {
        return this.reservationUsecase.updateCcReceipient(reservationId, updateDto);
    }
}
