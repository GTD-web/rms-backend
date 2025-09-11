import { Controller, Get, Post, Body, Param, Patch, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';

import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReservationWithRelationsResponseDto, ReservationResponseDto } from '../dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { ReturnVehicleDto } from '../dtos/update-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { DateUtil } from '@libs/utils/date.util';

@ApiTags('v2 예약 ')
@Controller('v2/reservations')
@ApiBearerAuth()
@Roles(Role.USER)
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Get('')
    @ApiOperation({
        summary: '예약 리스트 조회 #관리자/예약관리',
    })
    @ApiOkResponse({
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
        return this.reservationService.findReservationList(startDate, endDate, resourceType, resourceId, status);
    }

    @Get('check')
    @ApiOperation({ summary: '확인이 필요한 예약들' })
    @ApiOkResponse({
        description: '확인이 필요한 예약들 조회 성공',
        type: [ReservationWithRelationsResponseDto],
    })
    async findCheckReservationList(
        @Query() query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.reservationService.findCheckReservationList(query);
    }

    @Get(':reservationId')
    @ApiOperation({ summary: '예약 상세 조회 #사용자/예약상세페이지' })
    @ApiOkResponse({
        description: '예약 상세 조회 성공',
        type: ReservationWithRelationsResponseDto,
    })
    async findOne(
        @User() user: Employee,
        @Param('reservationId') reservationId: string,
    ): Promise<ReservationWithRelationsResponseDto> {
        return this.reservationService.findOne(user, reservationId);
    }

    @Patch(':reservationId/status')
    @ApiOperation({ summary: '예약 상태 수정 #관리자/예약관리/예약상세' })
    @ApiOkResponse({
        description: '예약 상태 수정 성공',
        type: ReservationResponseDto,
    })
    @Roles(Role.SYSTEM_ADMIN)
    async updateStatus(
        @Param('reservationId') reservationId: string,
        @Body() updateDto: UpdateReservationStatusDto,
    ): Promise<ReservationResponseDto> {
        return this.reservationService.updateStatus(reservationId, updateDto);
    }

    @Patch(':reservationId/return-vehicle')
    @ApiOperation({ summary: '차량 반납 #사용자/자원예약/차량반납' })
    @ApiOkResponse({
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
