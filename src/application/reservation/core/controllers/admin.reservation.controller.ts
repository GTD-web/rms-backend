import { Controller, Get, Body, Param, Patch, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ReservationResponseDto, UpdateReservationStatusDto } from '@resource/dtos.index';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { DateUtil } from '@libs/utils/date.util';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { AdminReservationService } from '../services/admin-reservation.service';
import { ReturnVehicleDto } from '../dtos/update-reservation.dto';

@ApiTags('2. 예약 - 관리자 ')
@Controller('v1/admin/reservations')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminReservationController {
    constructor(private readonly adminReservationService: AdminReservationService) {}

    @Get()
    @ApiOperation({
        summary: '예약 리스트 조회 #관리자/예약관리',
    })
    @ApiDataResponse({
        description: '예약 리스트 조회 성공',
        type: [ReservationWithRelationsResponseDto],
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
        return this.adminReservationService.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }

    @Get('check')
    @ApiOperation({ summary: '확인이 필요한 예약들' })
    @ApiDataResponse({
        description: '확인이 필요한 예약들 조회 성공',
        type: [ReservationWithRelationsResponseDto],
    })
    async findCheckReservationList(
        @Query() query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.adminReservationService.findCheckReservationList(query);
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
        return this.adminReservationService.findOne(user, reservationId);
    }

    @Patch(':reservationId/status')
    @ApiOperation({ summary: '예약 상태 수정 #관리자/예약관리/예약상세' })
    @ApiDataResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    async updateStatus(
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        return this.adminReservationService.updateStatus(reservationId, updateDto);
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
        return this.adminReservationService.returnVehicle(user, reservationId, returnDto);
    }
}
