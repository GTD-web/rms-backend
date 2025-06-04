import { Controller, Get, Post, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '../dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { MaintenanceService } from '@src/application/resource/vehicle/services/maintenance.service';

@ApiTags('4. 차량 정비 이력 - 관리자 ')
@Controller('v1/admin/maintenances')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminMaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) {}

    @Post()
    @ApiOperation({ summary: '정비 이력 생성' })
    @ApiDataResponse({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: MaintenanceResponseDto,
    })
    async create(
        @User() user: Employee,
        @Body() createMaintenanceDto: CreateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceService.save(user, createMaintenanceDto);
    }

    @Get('vehicle/:vehicleInfoId')
    @ApiOperation({ summary: '정비 이력 목록 조회' })
    @ApiDataResponse({
        description: '정비 이력 목록을 조회했습니다.',
        type: [MaintenanceResponseDto],
    })
    @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
    @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
    async findAll(
        @User() user: Employee,
        @Param('vehicleInfoId') vehicleInfoId: string,
        @Query() query: PaginationQueryDto,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        const { page, limit } = query;
        return this.maintenanceService.findAllByVehicleInfoId(user, vehicleInfoId, page, limit);
    }

    @Get(':maintenanceId')
    @ApiOperation({ summary: '정비 상세 이력 조회' })
    @ApiDataResponse({
        description: '정비 상세 이력을 조회했습니다.',
        type: MaintenanceResponseDto,
    })
    async findOne(
        @User() user: Employee,
        @Param('maintenanceId') maintenanceId: string,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceService.findOne(user, maintenanceId);
    }

    @Patch(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 수정' })
    @ApiDataResponse({
        description: '정비 이력이 수정되었습니다.',
        type: MaintenanceResponseDto,
    })
    async update(
        @Param('maintenanceId') maintenanceId: string,
        @Body() updateMaintenanceDto: UpdateMaintenanceDto,
        @User() user: Employee,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceService.update(user, maintenanceId, updateMaintenanceDto);
    }

    @Delete(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 삭제' })
    @ApiDataResponse({
        description: '정비 이력이 삭제되었습니다.',
    })
    async remove(@User() user: Employee, @Param('maintenanceId') maintenanceId: string): Promise<void> {
        return this.maintenanceService.delete(user, maintenanceId);
    }
}
