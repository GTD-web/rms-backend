import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { MaintenanceService } from '@resource/modules/resource/vehicle/application/services/maintenance.service';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { MaintenanceUsecase } from '@resource/modules/resource/vehicle/application/usecases/maintenance.usecase';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';

@ApiTags('4. 차량 정비 이력 - 사용자 페이지')
@Controller('v1/maintenances')
@ApiBearerAuth()
export class UserMaintenanceController {
    constructor(private readonly maintenanceUsecase: MaintenanceUsecase) {}
    // check api
    @Post()
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 이력 생성' })
    @ApiDataResponse({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: MaintenanceResponseDto,
    })
    async create(
        @User() user: UserEntity,
        @Body() createMaintenanceDto: CreateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.save(user, createMaintenanceDto);
    }
}
