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

@ApiTags('정비 이력')
@Controller('maintenances')
@ApiBearerAuth()
export class MaintenanceController {
    constructor(private readonly maintenanceUsecase: MaintenanceUsecase) {}

    @ApiTags('sprint0.3')
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

    @ApiTags('sprint0.3')
    @Get('vehicle/:vehicleInfoId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 이력 목록 조회' })
    @ApiDataResponse({
        description: '정비 이력 목록을 조회했습니다.',
        type: [MaintenanceResponseDto],
    })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findAll(
        @User() user: UserEntity,
        @Param('vehicleInfoId') vehicleInfoId: string,
        @Query() query: PaginationQueryDto,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        const { page, limit } = query;
        return this.maintenanceUsecase.findAllByVehicleInfoId(user, vehicleInfoId, page, limit);
    }

    @ApiTags('sprint0.3')
    @Get(':maintenanceId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 상세 이력 조회' })
    @ApiDataResponse({
        description: '정비 상세 이력을 조회했습니다.',
        type: MaintenanceResponseDto,
    })
    async findOne(
        @User() user: UserEntity,
        @Param('maintenanceId') maintenanceId: string,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.findOne(user, maintenanceId);
    }

    @ApiTags('sprint0.3')
    @Patch(':maintenanceId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 이력 수정' })
    @ApiDataResponse({
        description: '정비 이력이 수정되었습니다.',
        type: MaintenanceResponseDto,
    })
    async update(
        @Param('maintenanceId') maintenanceId: string,
        @Body() updateMaintenanceDto: UpdateMaintenanceDto,
        @User() user: UserEntity,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.update(user, maintenanceId, updateMaintenanceDto);
    }

    @ApiTags('sprint0.3')
    @Delete(':maintenanceId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 이력 삭제' })
    @ApiDataResponse({
        description: '정비 이력이 삭제되었습니다.',
    })
    async remove(@User() user: UserEntity, @Param('maintenanceId') maintenanceId: string): Promise<void> {
        return this.maintenanceUsecase.delete(user, maintenanceId);
    }
}
