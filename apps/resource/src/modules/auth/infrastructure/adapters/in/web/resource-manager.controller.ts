import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { ResourceManagerUseCase } from '@resource/modules/auth/application/usecases/resource-manager.usecase';
import { EmplyeesByDepartmentResponseDto } from '@resource/dtos.index';

@ApiTags('3. 자원 관리자')
@ApiBearerAuth()
@Controller('resource-managers')
export class ResourceManagerController {
    constructor(private readonly resourceManagerUseCase: ResourceManagerUseCase) {}

    @Get()
    @Roles(Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '자원 관리자 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '자원 관리자 목록 조회 성공',
        type: [EmplyeesByDepartmentResponseDto],
    })
    async findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.resourceManagerUseCase.findAllResourceManagers();
    }
}
