import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { CreateReservationDto } from '../../../../../../application/dtos/create-reservation.dto';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import {
    CreateReservationResponseDto,
    ReservationResponseDto,
    UpdateReservationTimeDto,
    UpdateReservationParticipantsDto,
    UpdateReservationTitleDto,
    ReservationSnapshotResponseDto,
    UpdateReservationSnapshotDto,
    ReturnVehicleDto,
} from '@resource/dtos.index';
import { ReservationUsecase } from '../../../../../../application/usecases/reservation.usecase';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import {
    ReservationWithRelationsResponseDto,
    GroupedReservationResponseDto,
    GroupedReservationWithResourceResponseDto,
} from '@resource/modules/reservation/application/dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { CreateReservationSnapshotDto } from '@resource/modules/reservation/application/dtos/reservation-snapshot.dto';
import { ReservationSnapshotUsecase } from '@resource/modules/reservation/application/usecases/reservation-snapshot.usecase';
import { UpdateReservationDto } from '@resource/modules/reservation/application/dtos/update-reservation.dto';
import { Public } from '@libs/decorators/public.decorator';

@ApiTags('2. 예약 - 사용자 페이지')
@Controller('v1/reservations')
@ApiBearerAuth()
@Roles(Role.USER)
export class UserReservationController {
    constructor(
        private readonly reservationUsecase: ReservationUsecase,
        private readonly reservationSnapshotUsecase: ReservationSnapshotUsecase,
    ) {}

    @Post('snapshot')
    @ApiOperation({ summary: '예약 스냅샷 생성' })
    @ApiDataResponse({
        description: '예약 스냅샷 생성 성공',
        type: ReservationSnapshotResponseDto,
    })
    async createSnapshot(
        @User() user: UserEntity,
        @Body() createSnapshotDto: CreateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.reservationSnapshotUsecase.upsertSnapshot(user, createSnapshotDto);
    }

    @Patch('snapshot')
    @ApiOperation({ summary: '예약 스냅샷 업데이트' })
    @ApiDataResponse({
        description: '예약 스냅샷 업데이트 성공',
        type: ReservationSnapshotResponseDto,
    })
    async updateSnapshot(
        @User() user: UserEntity,
        @Body() updateSnapshotDto: UpdateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.reservationSnapshotUsecase.updateSnapshot(updateSnapshotDto);
    }

    @Get('snapshot/user')
    @ApiOperation({ summary: '유저의 예약 스냅샷 조회' })
    @ApiDataResponse({
        description: '예약 스냅샷 조회 성공',
        type: ReservationSnapshotResponseDto,
    })
    async findUserSnapshot(@User() user: UserEntity): Promise<ReservationSnapshotResponseDto> {
        return this.reservationSnapshotUsecase.findSnapshotByUserId(user.userId);
    }

    @Delete('snapshot/:snapshotId')
    @ApiOperation({ summary: '예약 스냅샷 삭제' })
    async deleteSnapshot(@User() user: UserEntity, @Param('snapshotId') snapshotId: string): Promise<void> {
        await this.reservationSnapshotUsecase.deleteSnapshot(snapshotId);
    }

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

    // 현재 쓰이는 곳 없음
    @Get('me')
    @ApiOperation({ summary: '내 예약 리스트 조회, 자원 타입별 ' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회',
        type: [ReservationWithRelationsResponseDto],
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findMyReservationList(
        @User() user: UserEntity,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const { page, limit } = query;
        return this.reservationUsecase.findMyReservationList(user.employeeId, page, limit, resourceType);
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
        @User() user: UserEntity,
        @Param('resourceId') resourceId: string,
        @Query() query?: PaginationQueryDto,
        @Query('month') month?: string,
        @Query('isMine') isMine?: boolean,
    ): Promise<GroupedReservationWithResourceResponseDto> {
        const { page, limit } = query;
        console.log(page, limit);
        return this.reservationUsecase.findResourceReservationList(
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
        @User() user: UserEntity,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.reservationUsecase.findMyUsingReservationList(user.employeeId);
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
        @User() user: UserEntity,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.reservationUsecase.findMyUpcomingReservationList(user.employeeId, query, resourceType);
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
        @User() user: UserEntity,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<GroupedReservationResponseDto>> {
        return this.reservationUsecase.findMyAllSchedules(user.employeeId, query, resourceType);
    }

    @Get(':reservationId')
    @ApiOperation({ summary: '예약 상세 조회 #사용자/예약상세페이지' })
    @ApiDataResponse({
        description: '예약 상세 조회 성공',
        type: ReservationWithRelationsResponseDto,
    })
    async findOne(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
    ): Promise<ReservationWithRelationsResponseDto> {
        return this.reservationUsecase.findReservationDetail(user, reservationId);
    }

    @Patch(':reservationId')
    @ApiOperation({ summary: '예약 수정' })
    @ApiDataResponse({
        description: '예약 수정 성공',
        type: ReservationResponseDto,
    })
    async updateReservation(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateReservation(reservationId, updateDto);
    }

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

    @Patch(':reservationId/status/cancel')
    @ApiOperation({ summary: '예약 취소 #사용자/예약상세페이지' })
    @ApiDataResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    async updateStatusCancel(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        // @Body() updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
        return this.reservationUsecase.updateStatus(reservationId, { status: ReservationStatus.CANCELLED });
    }

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

    // check api
    @Patch(':reservationId/return-vehicle')
    @ApiOperation({ summary: '차량 반납 #사용자/자원예약/차량반납' })
    @ApiDataResponse({
        status: 200,
        description: '차량 반납 성공',
    })
    async returnVehicle(
        @User() user: UserEntity,
        @Param('reservationId') reservationId: string,
        @Body() returnDto: ReturnVehicleDto,
    ): Promise<boolean> {
        return this.reservationUsecase.returnVehicle(user, reservationId, returnDto);
    }

    @ApiExcludeEndpoint()
    @Public()
    @Get('cron-job/close')
    async closeReservation() {
        return this.reservationUsecase.handleCron();
    }
}
