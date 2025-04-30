import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Patch,
    Query,
    ParseArrayPipe,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
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
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import {
    ReservationWithResourceResponseDto,
    ReservationWithRelationsResponseDto,
} from '@resource/modules/reservation/application/dtos/reservation-response.dto';
import { DateUtil } from '@libs/utils/date.util';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { Public } from '@libs/decorators/public.decorator';

@ApiTags('예약')
@Controller('reservations')
@ApiBearerAuth()
export class ReservationController {
    constructor(private readonly reservationUsecase: ReservationUsecase) {}
    // check api
    @Post()
    @Roles(Role.USER)
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

    // check api - url, query
    @Get('me')
    @Roles(Role.USER)
    @ApiOperation({ summary: '내 예약 리스트 조회, 시간 별, 자원 타입별 쿼리 가능 #사용자/홈 ' })
    @ApiDataResponse({
        description: '내 예약 리스트 조회 성공',
        type: [ReservationWithRelationsResponseDto],
    })
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findMyReservationList(
        @User() user: UserEntity,
        @Query('startDate') startDate?: string,
        @Query('resourceType') resourceType?: ResourceType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        const { page, limit } = query;
        return this.reservationUsecase.findMyReservationList(user.employeeId, page, limit, resourceType, startDate);
    }

    @Get('me/current')
    @Roles(Role.USER)
    @ApiOperation({ summary: '내 예약 현재 예약 조회, 자원 타입별 쿼리 가능 #사용자/자원예약/이용중 ' })
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

    // check api - 다른 두개의 api로 대체 예정 (upcoming)
    @Get('me/all')
    @Roles(Role.USER)
    @ApiOperation({ summary: '내 예약 및 참여 예약 조회, 타입별 쿼리 가능 #사용자/홈/추가기획사항 ' })
    @ApiDataResponse({
        description: '내 예약 및 참여 예약 조회 성공',
        type: [ReservationWithRelationsResponseDto],
    })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    @ApiQuery({
        name: 'type',
        enum: ParticipantsType,
        example: ParticipantsType.RESERVER,
    })
    async findMyAllReservations(
        @User() user: UserEntity,
        @Query('type') type: ParticipantsType,
        @Query() query?: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        if (type !== ParticipantsType.RESERVER && type !== ParticipantsType.PARTICIPANT) {
            throw new BadRequestException('지원하지 않는 타입입니다.');
        }
        const { page, limit } = query;
        return await this.reservationUsecase.findMyAllReservations(user.employeeId, page, limit, type);
    }

    // check api - user, admin 구분 필요
    @Get(':reservationId')
    @Roles(Role.USER)
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

    // check api
    @Get()
    @Roles(Role.USER)
    @ApiOperation({
        summary: '예약 리스트 조회 #관리자/예약관리',
    })
    @ApiDataResponse({
        description: '예약 리스트 조회 성공',
        type: [ReservationWithResourceResponseDto],
    })
    @ApiQuery({
        name: 'startDate',
        type: String,
        required: false,
        example: DateUtil.now().addDays(-20).format('YYYY-MM-DD'),
    })
    @ApiQuery({
        name: 'endDate',
        type: String,
        required: false,
        example: DateUtil.now().addDays(30).format('YYYY-MM-DD'),
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: false, example: ResourceType.MEETING_ROOM })
    @ApiQuery({ name: 'resourceId', type: String, required: false, example: '78117aaf-a203-43a3-bb38-51ec91ca935a' })
    @ApiQuery({
        name: 'status',
        enum: ReservationStatus,
        description: `Available values : ${Object.values(ReservationStatus).join(', ')}`,
        isArray: true,
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
    ): Promise<ReservationWithRelationsResponseDto[]> {
        return this.reservationUsecase.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }

    // check api - user, admin 구분 필요
    @Patch(':reservationId/title')
    @Roles(Role.USER)
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
    // check api - user, admin 구분 필요
    @Patch(':reservationId/time')
    @Roles(Role.USER)
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

    // check api
    @Patch(':reservationId/status')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '예약 상태 수정 #관리자/예약관리/예약상세' })
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

    // check api
    @Patch(':reservationId/status/cancel')
    @Roles(Role.USER)
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
    // check api - user, admin 구분 필요
    @Patch(':reservationId/participants')
    @Roles(Role.USER)
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

    // @Patch(':reservationId/cc-receipient')
    // @Roles(Role.USER)
    // @ApiOperation({ summary: '예약 수신참조자 수정' })
    // @ApiDataResponse({
    //     description: '예약 수신참조자 수정 성공',
    //     type: ReservationResponseDto,
    // })
    // async updateCcReceipient(
    //     @User() user: UserEntity,
    //     @Param('reservationId') reservationId: string,
    //     @Body() updateDto: UpdateReservationCcReceipientDto,
    // ): Promise<ReservationResponseDto> {
    //     await this.reservationUsecase.checkReservationAccess(reservationId, user.employeeId);
    //     return this.reservationUsecase.updateCcReceipient(reservationId, updateDto);
    // }

    @ApiExcludeEndpoint()
    @Public()
    @Get('cron-job/close')
    async closeReservation() {
        return this.reservationUsecase.handleCron();
    }
}
