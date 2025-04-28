import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import {
    CreateResourceInfoDto,
    UpdateResourceInfoDto,
    ResourceResponseDto,
    ResourceAvailabilityDto,
} from '@resource/dtos.index';
import { ResourceQueryDto } from '@resource/modules/resource/common/application/dtos/resource-query.dto';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceUsecase } from '@resource/modules/resource/common/application/usecases/resource.usecase';
import { ResourceGroupWithResourcesAndReservationsResponseDto } from '@resource/modules/resource/common/application/dtos/resource-response.dto';
import {
    ReturnVehicleDto,
    UpdateResourceOrdersDto,
} from '@resource/modules/resource/common/application/dtos/update-resource.dto';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';

@ApiTags('자원')
@Controller('resources')
@ApiBearerAuth()
export class ResourceController {
    constructor(private readonly resourceUsecase: ResourceUsecase) {}

    @Get()
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 목록 조회 #관리자/자원관리/자원리스트' })
    @ApiDataResponse({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [ResourceResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType })
    async findAll(@Query('type') type: ResourceType): Promise<ResourceResponseDto[]> {
        return this.resourceUsecase.findResources(type);
    }

    // check api
    @Get('reservations')
    @Roles(Role.USER)
    @ApiOperation({ summary: '자원 별 예약 목록 조회 #사용자/자원예약/리스트 #사용자/세부예약내역' })
    @ApiDataResponse({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [ResourceGroupWithResourcesAndReservationsResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType })
    @ApiQuery({ name: 'startDate', example: '2025-01-01 or 2025-01-01 00:00:00' })
    @ApiQuery({ name: 'endDate', example: '2025-01-01 or 2025-01-01 00:00:00' })
    async findResourcesByTypeAndDateWithReservations(
        @User() user: UserEntity,
        @Query('type') type: ResourceType,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]> {
        return this.resourceUsecase.findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate);
    }

    // check api - url
    @Get('availability')
    @Roles(Role.USER)
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
    @ApiQuery({ name: 'startDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'endDate', type: String, required: false, example: '2025-01-01' })
    @ApiQuery({ name: 'startTime', type: String, required: false, example: '09:00:00' })
    @ApiQuery({ name: 'endTime', type: String, required: false, example: '18:00:00' })
    @ApiQuery({ name: 'am', type: Boolean, required: false, example: true })
    @ApiQuery({ name: 'pm', type: Boolean, required: false, example: true })
    @ApiQuery({ name: 'timeUnit', type: Number, required: false, example: 30 })
    async findAvailableTime(@Query() query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]> {
        return this.resourceUsecase.findAvailableTime(query);
    }

    // check api
    @Patch(':resourceId/return-vehicle')
    @Roles(Role.USER)
    @ApiOperation({ summary: '차량 반납 #사용자/자원예약/차량반납' })
    @ApiDataResponse({
        status: 200,
        description: '차량 반납 성공',
    })
    async returnVehicle(
        @User() user: UserEntity,
        @Param('resourceId') resourceId: string,
        @Body() returnDto: ReturnVehicleDto,
    ): Promise<boolean> {
        return this.resourceUsecase.returnVehicle(user, resourceId, returnDto);
    }

    @Post()
    @Roles(Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 생성 #관리자/자원관리/생성' })
    @ApiDataResponse({
        status: 201,
        description: '자원이 성공적으로 생성되었습니다.',
    })
    async createWithInfos(@Body() createResourceInfo: CreateResourceInfoDto): Promise<boolean> {
        return this.resourceUsecase.createResourceWithInfos(createResourceInfo);
    }

    @Get(':resourceId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 상세 조회 #관리자/자원관리/상세' })
    @ApiDataResponse({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: ResourceResponseDto,
    })
    async findOne(@Param('resourceId') resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceUsecase.findResourceDetailForAdmin(resourceId);
    }

    @Patch('order')
    @Roles(Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 순서 변경' })
    @ApiDataResponse({
        status: 200,
        description: '자원 순서가 성공적으로 변경되었습니다.',
    })
    async reorder(@Body() updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        return this.resourceUsecase.reorderResources(updateResourceOrdersDto);
    }

    @Patch(':resourceId')
    @Roles(Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 수정' })
    @ApiDataResponse({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: ResourceResponseDto,
    })
    async update(
        @Param('resourceId') resourceId: string,
        @Body() updateResourceInfoDto: UpdateResourceInfoDto,
    ): Promise<ResourceResponseDto> {
        return this.resourceUsecase.updateResource(resourceId, updateResourceInfoDto);
    }

    @Delete(':resourceId')
    @Roles(Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '자원이 성공적으로 삭제되었습니다.',
    })
    async remove(@Param('resourceId') resourceId: string): Promise<void> {
        return this.resourceUsecase.deleteResource(resourceId);
    }
}
