import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
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
    @Get(':consumableId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '정비 이력 목록 조회' })
    @ApiDataResponse({
        description: '정비 이력 목록을 조회했습니다.',
        type: [MaintenanceResponseDto],
    })
    async findAll(
        @User() user: UserEntity,
        @Param('consumableId') consumableId: string,
    ): Promise<MaintenanceResponseDto[]> {
        return this.maintenanceUsecase.findAll(user, consumableId);
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
