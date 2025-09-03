import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';
import { ResourceType } from '@libs/enums/resource-type.enum';
import {
    ResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
} from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceGroupService } from '@src/application/resource/core/services/resource-group.service';

@ApiTags('3. 자원 그룹 ')
@Controller('v1/resource-groups')
@ApiBearerAuth()
@Roles(Role.USER)
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class UserResourceGroupController {
    constructor(private readonly resourceGroupService: ResourceGroupService) {}

    @Get('parents')
    @ApiOperation({ summary: '상위그룹 목록 조회 #사용자/자원구분/모달' })
    @ApiDataResponse({
        description: '상위 자원 그룹 목록을 조회했습니다.',
        type: [ResourceGroupResponseDto],
    })
    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        return this.resourceGroupService.findParentResourceGroups();
    }

    @Get('resources')
    @ApiOperation({ summary: '상위그룹-하위그룹-자원 목록 조회 #사용자/자원선택/모달 #관리자/자원관리/자원목록' })
    @ApiDataResponse({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [ResourceGroupWithResourcesResponseDto],
    })
    @ApiQuery({ name: 'type', enum: ResourceType, required: false })
    async findAll(@Query('type') type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]> {
        return this.resourceGroupService.findResourceGroupsWithResourceData(type);
    }
}
