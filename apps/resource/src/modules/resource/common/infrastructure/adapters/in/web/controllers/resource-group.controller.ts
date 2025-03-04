import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ResourceGroupService } from '@resource/modules/resource/common/application/services/resource-group.service';
import { CreateResourceGroupDto } from '@resource/modules/resource/common/application/dtos/create-resource-group.dto';
import { ResourceGroupResponseDto } from '@resource/modules/resource/common/application/dtos/resource-group-response.dto';
import { UpdateResourceGroupDto } from '@resource/modules/resource/common/application/dtos/update-resource-group.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResourceGroupUsecase } from '@resource/modules/resource/common/application/usecases/resource-group.usecase';

@ApiTags('자원 그룹')
@Controller('resource-groups')
@ApiBearerAuth()
export class ResourceGroupController {
    constructor(private readonly resourceGroupUsecase: ResourceGroupUsecase) {}

    @ApiTags('sprint0.1')
    @Get('parents')
    @Roles(Role.USER)
    @ApiOperation({ summary: '상위 자원 그룹 목록 조회 #자원 구분 모달' })
    @ApiDataResponse({
        description: '상위 자원 그룹 목록을 조회했습니다.',
        type: [ResourceGroupResponseDto],
    })
    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        return this.resourceGroupUsecase.findParentResourceGroups();
    }

    @ApiTags('sprint0.1')
    @Get('resources')
    @Roles(Role.USER)
    @ApiOperation({ summary: '자원 그룹들과 각 그룹에 속한 자원 목록 조회 # 자원 선택 모달' })
    @ApiDataResponse({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [ResourceGroupResponseDto],
    })
    async findAll(): Promise<ResourceGroupResponseDto[]> {
        return this.resourceGroupUsecase.findResourceGroupsWithResourceData();
    }

    // @Post()
    // @Roles(Role.SYSTEM_ADMIN)
    // @ApiOperation({ summary: '자원 그룹 생성' })
    // @ApiDataResponse({
    //     status: 201,
    //     description: '자원 그룹이 생성되었습니다.',
    //     type: ResourceGroupResponseDto,
    // })
    // async create(@Body() createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroupResponseDto> {
    //     return this.resourceGroupService.create(createResourceGroupDto);
    // }

    // @Patch(':resourceGroupId')
    // @Roles(Role.SYSTEM_ADMIN)
    // @ApiOperation({ summary: '자원 그룹 수정' })
    // @ApiDataResponse({
    //     description: '자원 그룹이 수정되었습니다.',
    //     type: ResourceGroupResponseDto,
    // })
    // async update(
    //     @Param('resourceGroupId') resourceGroupId: string,
    //     @Body() updateResourceGroupDto: UpdateResourceGroupDto,
    // ): Promise<ResourceGroupResponseDto> {
    //     return this.resourceGroupService.update(resourceGroupId, updateResourceGroupDto);
    // }

    // @Delete(':resourceGroupId')
    // @Roles(Role.SYSTEM_ADMIN)
    // @ApiOperation({ summary: '자원 그룹 삭제' })
    // @ApiDataResponse({
    //     description: '자원 그룹이 삭제되었습니다.',
    // })
    // async remove(@Param('resourceGroupId') resourceGroupId: string): Promise<void> {
    //     await this.resourceGroupService.remove(resourceGroupId);
    // }
}
