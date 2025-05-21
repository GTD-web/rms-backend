import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import {} from '@resource/modules/resource/common/application/dtos/create-resource.dto';
import {
    ResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
} from '@resource/modules/resource/common/application/dtos/resource-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResourceGroupUsecase } from '@resource/modules/resource/common/application/usecases/resource-group.usecase';
import { ResourceType } from '@libs/enums/resource-type.enum';

@ApiTags('3. 자원 그룹 - 사용자 페이지')
@Controller('v1/resource-groups')
@ApiBearerAuth()
@Roles(Role.USER)
export class UserResourceGroupController {
    constructor(private readonly resourceGroupUsecase: ResourceGroupUsecase) {}

    @Get('parents')
    @ApiOperation({ summary: '상위그룹 목록 조회 #사용자/자원구분/모달' })
    @ApiDataResponse({
        description: '상위 자원 그룹 목록을 조회했습니다.',
        type: [ResourceGroupResponseDto],
    })
    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        return this.resourceGroupUsecase.findParentResourceGroups();
    }

    @Get('resources')
    @ApiOperation({ summary: '상위그룹-하위그룹-자원 목록 조회 #사용자/자원선택/모달 #관리자/자원관리/자원목록' })
    @ApiDataResponse({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [ResourceGroupWithResourcesResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType, required: false })
    async findAll(@Query('type') type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]> {
        return this.resourceGroupUsecase.findResourceGroupsWithResourceData(type);
    }
}
