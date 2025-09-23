import { Controller, Get, Body, Param, Patch, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Roles } from '@libs/decorators/role.decorator';
import { User } from '@libs/decorators/user.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';
import {
    ResourceResponseDto,
    ResourceGroupWithResourcesAndReservationsResponseDto,
} from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import {
    CheckAvailabilityQueryDto,
    CheckAvailabilityResponseDto,
} from '@src/application/resource/core/dtos/check-availability.dto';
import { ResourceService } from '@src/application/resource/core/services/resource.service';

@ApiTags('3. 자원 ')
@Controller('v1/resources')
@ApiBearerAuth()
@Roles(Role.USER)
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class UserResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Get('reservations')
    @ApiOperation({ summary: '자원 별 예약 목록 조회 #사용자/자원예약/리스트 #사용자/세부예약내역' })
    @ApiDataResponse({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [ResourceGroupWithResourcesAndReservationsResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType })
    @ApiQuery({ name: 'startDate', example: '2025-01-01 or 2025-01-01 00:00:00' })
    @ApiQuery({ name: 'endDate', example: '2025-01-01 or 2025-01-01 00:00:00' })
    @ApiQuery({ name: 'isMine', type: Boolean, required: false, example: true })
    async findResourcesByTypeAndDateWithReservations(
        @User() user: Employee,
        @Query('type') type: ResourceType,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('isMine') isMine: boolean,
    ): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]> {
        console.log('findResourcesByTypeAndDateWithReservations');
        return this.resourceService.findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate, isMine);
    }

    @Get('availability')
    @ApiOperation({ summary: '예약 가능 시간 조회 #사용자/예약 생성 페이지' })
    @ApiDataResponse({
        description: '예약 가능 시간 조회 성공',
        type: ResourceAvailabilityDto,
    })
    @ApiQuery({ name: 'resourceType', enum: ResourceType, required: true, example: ResourceType.MEETING_ROOM })
    @ApiQuery({
        name: 'resourceGroupId',
        type: String,
        required: true,
        example: '78117aaf-a203-43a3-bb38-51ec91ca935a',
    })
    @ApiQuery({ name: 'reservationId', type: String, required: false, example: '123e4567-e89b-12d3-a456-426614174000' })
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'endDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'startTime', type: String, required: false, example: '09:00:00' })
    @ApiQuery({ name: 'endTime', type: String, required: false, example: '18:00:00' })
    @ApiQuery({ name: 'am', type: Boolean, required: false, example: true })
    @ApiQuery({ name: 'pm', type: Boolean, required: false, example: true })
    @ApiQuery({ name: 'timeUnit', type: Number, required: false, example: 30 })
    async findAvailableTime(@Query() query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        return this.resourceService.findAvailableTime(query);
    }

    @Get('check-availability')
    @ApiOperation({ summary: '예약 시간 가용성 확인' })
    @ApiDataResponse({
        description: '예약 시간 가용성 확인 결과',
        type: CheckAvailabilityResponseDto,
    })
    async checkAvailability(@Query() query: CheckAvailabilityQueryDto): Promise<CheckAvailabilityResponseDto> {
        const isAvailable = await this.resourceService.checkAvailability(
            query.resourceId,
            query.startDate,
            query.endDate,
            query.reservationId,
        );

        return {
            isAvailable,
        };
    }

    @Get(':resourceId')
    @ApiOperation({ summary: '자원 상세 조회 ' })
    @ApiDataResponse({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: ResourceResponseDto,
    })
    async findOne(@User() user: Employee, @Param('resourceId') resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceService.findResourceDetailForUser(user.employeeId, resourceId);
    }
}
