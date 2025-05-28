import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { CreateResourceInfoDto } from '@src/application/resource/core/dtos/create-resource.dto';
import {
    UpdateResourceInfoDto,
    UpdateResourceOrdersDto,
} from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceService } from '@src/application/resource/core/services/resource.service';

@ApiTags('3. 자원 - 관리자 ')
@Controller('v1/admin/resources')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Post()
    @ApiOperation({ summary: '자원 생성 #관리자/자원관리/생성' })
    @ApiDataResponse({
        status: 201,
        description: '자원이 성공적으로 생성되었습니다.',
    })
    async createWithInfos(@Body() createResourceInfo: CreateResourceInfoDto): Promise<boolean> {
        return this.resourceService.createResourceWithInfos(createResourceInfo);
    }

    @Get()
    @ApiOperation({ summary: '자원 목록 조회 #관리자/자원관리/자원리스트' })
    @ApiDataResponse({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [ResourceResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType })
    async findAll(@Query('type') type: ResourceType): Promise<ResourceResponseDto[]> {
        return this.resourceService.findResources(type);
    }

    @Get(':resourceId')
    @ApiOperation({ summary: '자원 상세 조회 #관리자/자원관리/상세' })
    @ApiDataResponse({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: ResourceResponseDto,
    })
    async findOne(@Param('resourceId') resourceId: string): Promise<ResourceResponseDto> {
        return this.resourceService.findResourceDetailForAdmin(resourceId);
    }

    @Patch('order')
    @ApiOperation({ summary: '자원 순서 변경' })
    @ApiDataResponse({
        status: 200,
        description: '자원 순서가 성공적으로 변경되었습니다.',
    })
    async reorder(@Body() updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void> {
        return this.resourceService.reorderResources(updateResourceOrdersDto);
    }

    @Patch(':resourceId')
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
        return this.resourceService.updateResource(resourceId, updateResourceInfoDto);
    }

    @Patch(':resourceId/availability')
    @ApiOperation({ summary: '자원 예약 가능 상태 수정' })
    @ApiDataResponse({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: ResourceResponseDto,
    })
    async updateAvailability(
        @Param('resourceId') resourceId: string,
        @Body() updateResourceInfoDto: UpdateResourceInfoDto,
    ): Promise<ResourceResponseDto> {
        return this.resourceService.updateResource(resourceId, updateResourceInfoDto);
    }

    @Delete(':resourceId')
    @ApiOperation({ summary: '자원 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '자원이 성공적으로 삭제되었습니다.',
    })
    async remove(@Param('resourceId') resourceId: string): Promise<void> {
        return this.resourceService.deleteResource(resourceId);
    }
}
