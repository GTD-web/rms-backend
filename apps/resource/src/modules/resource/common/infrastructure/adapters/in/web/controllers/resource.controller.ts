import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiExtraModels } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ResourceService } from '@resource/modules/resource/common/application/services/resource.service';
import {
    CreateResourceRequestDto,
    UpdateResourceRequestDto,
    ResourceResponseDto,
    ReservationResponseDto,
} from '@resource/dtos.index';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceUsecase } from '@resource/modules/resource/common/application/usecases/resource.usecase';
import { ResourceGroupResponseDto } from '@resource/modules/resource/common/application/dtos/resource-group-response.dto';
import { ReturnVehicleDto } from '@resource/modules/resource/common/application/dtos/return-vehicle.dto';

@ApiTags('자원')
@Controller('resources')
@ApiBearerAuth()
export class ResourceController {
    constructor(private readonly resourceUsecase: ResourceUsecase) {}

    @ApiTags('sprint0.1')
    @Get()
    @Roles(Role.USER)
    @ApiOperation({ summary: '자원 목록 조회 #자원 예약 페이지' })
    @ApiDataResponse({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [ResourceGroupResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType })
    @ApiQuery({ name: 'startDate' })
    @ApiQuery({ name: 'endDate' })
    async findResourcesByTypeAndDateWithReservations(
        @Query('type') type: ResourceType,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<ResourceGroupResponseDto[]> {
        return this.resourceUsecase.findResourcesByTypeAndDateWithReservations(type, startDate, endDate);
    }

    @ApiTags('sprint0.1')
    @Patch(':resourceId/return-vehicle')
    @ApiOperation({ summary: '차량 반납' })
    @ApiDataResponse({
        description: '차량 반납 성공',
    })
    async returnVehicle(@Param('resourceId') resourceId: string, @Body() returnDto: ReturnVehicleDto): Promise<void> {
        return this.resourceUsecase.returnVehicle(resourceId, returnDto);
    }

    // @ApiTags('sprint0.1')
    // @Get(':resourceId')
    // @ApiOperation({ summary: '자원 상세 조회' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '자원을 성공적으로 조회했습니다.',
    //     type: ResourceResponseDto,
    // })
    // async findOne(@Param('resourceId') resourceId: string): Promise<ResourceResponseDto> {
    //     return this.resourceService.findOne(resourceId);
    // }

    // @ApiTags('sprint0.1')
    // @Get('group/:resourceGroupId')
    // @ApiOperation({ summary: '그룹 별 자원 조회' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '그룹 별 자원을 성공적으로 조회했습니다.',
    //     type: ResourceResponseDto,
    // })
    // async findByResourceGroupId(@Param('resourceGroupId') resourceGroupId: string): Promise<ResourceResponseDto[]> {
    //     return this.resourceService.findByResourceGroupId(resourceGroupId);
    // }

    // @Post()
    // @Roles(Role.RESOURCE_ADMIN)
    // @ApiOperation({ summary: '자원 생성 (통합)' })
    // @ApiDataResponse({
    //     status: 201,
    //     description: '자원이 성공적으로 생성되었습니다.',
    //     type: ResourceResponseDto,
    // })
    // async createWithDetails(@Body() createResourceRequest: CreateResourceRequestDto): Promise<ResourceResponseDto> {
    //     return this.resourceService.createResourceWithDetails(createResourceRequest);
    // }

    // @Patch(':resourceId')
    // @ApiOperation({ summary: '자원 수정' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '자원이 성공적으로 수정되었습니다.',
    //     type: ResourceResponseDto,
    // })
    // async update(
    //     @Param('resourceId') resourceId: string,
    //     @Body() updateResourceDto: UpdateResourceRequestDto,
    // ): Promise<ResourceResponseDto> {
    //     return this.resourceService.update(resourceId, updateResourceDto);
    // }

    // @Delete(':resourceId')
    // @ApiOperation({ summary: '자원 삭제' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '자원이 성공적으로 삭제되었습니다.',
    // })
    // async remove(@Param('resourceId') resourceId: string): Promise<void> {
    //     return this.resourceService.delete(resourceId);
    // }
}
