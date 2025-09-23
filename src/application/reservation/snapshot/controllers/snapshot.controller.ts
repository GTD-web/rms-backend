import { Controller, Get, Post, Delete, Body, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { SnapshotService } from '../snapshot.service';
import {
    CreateReservationSnapshotDto,
    ReservationSnapshotResponseDto,
    UpdateReservationSnapshotDto,
} from '../dtos/reservation-snapshot.dto';

@ApiTags('2. 예약 ')
@Controller('v1/reservations')
@ApiBearerAuth()
@Roles(Role.USER)
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class UserReservationSnapshotController {
    constructor(private readonly snapshotService: SnapshotService) {}

    @Post('snapshot')
    @ApiOperation({ summary: '예약 스냅샷 생성' })
    @ApiDataResponse({
        description: '예약 스냅샷 생성 성공',
        type: ReservationSnapshotResponseDto,
    })
    async createSnapshot(
        @User() user: Employee,
        @Body() createSnapshotDto: CreateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.snapshotService.createSnapshot(user, createSnapshotDto);
    }

    @Patch('snapshot')
    @ApiOperation({ summary: '예약 스냅샷 업데이트' })
    @ApiDataResponse({
        description: '예약 스냅샷 업데이트 성공',
        type: ReservationSnapshotResponseDto,
    })
    async updateSnapshot(
        @User() user: Employee,
        @Body() updateSnapshotDto: UpdateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.snapshotService.updateSnapshot(user, updateSnapshotDto);
    }

    @Get('snapshot/user')
    @ApiOperation({ summary: '유저의 예약 스냅샷 조회' })
    @ApiDataResponse({
        description: '예약 스냅샷 조회 성공',
        type: ReservationSnapshotResponseDto,
    })
    async findUserSnapshot(@User() user: Employee): Promise<ReservationSnapshotResponseDto> {
        return this.snapshotService.findUserSnapshot(user);
    }

    @Delete('snapshot/:snapshotId')
    @ApiOperation({ summary: '예약 스냅샷 삭제' })
    async deleteSnapshot(@User() user: Employee, @Param('snapshotId') snapshotId: string): Promise<void> {
        await this.snapshotService.deleteSnapshot(user, snapshotId);
    }
}
