import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { MaintenanceService } from '@resource/modules/resource/vehicle/application/services/maintenance.service';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { MaintenanceUsecase } from '@resource/modules/resource/vehicle/application/usecases/maintenance.usecase';
@ApiTags('정비 이력')
@Controller('maintenances')
export class MaintenanceController {
    constructor(private readonly maintenanceUsecase: MaintenanceUsecase) {}

    @ApiTags('sprint0.3')
    @Post()
    @ApiOperation({ summary: '정비 이력 생성' })
    @ApiDataResponse({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: MaintenanceResponseDto,
    })
    async create(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.save(createMaintenanceDto);
    }

    @ApiTags('sprint0.3')
    @Get(':consumableId')
    @ApiOperation({ summary: '정비 이력 목록 조회' })
    @ApiDataResponse({
        description: '정비 이력 목록을 조회했습니다.',
        type: [MaintenanceResponseDto],
    })
    async findAll(@Param('consumableId') consumableId: string): Promise<MaintenanceResponseDto[]> {
        return this.maintenanceUsecase.findAll(consumableId);
    }

    @ApiTags('sprint0.3')
    @Get(':maintenanceId')
    @ApiOperation({ summary: '정비 상세 이력 조회' })
    @ApiDataResponse({
        description: '정비 상세 이력을 조회했습니다.',
        type: MaintenanceResponseDto,
    })
    async findOne(@Param('maintenanceId') maintenanceId: string): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.findOne(maintenanceId);
    }

    @ApiTags('sprint0.3')
    @Patch(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 수정' })
    @ApiDataResponse({
        description: '정비 이력이 수정되었습니다.',
        type: MaintenanceResponseDto,
    })
    async update(
        @Param('maintenanceId') maintenanceId: string,
        @Body() updateMaintenanceDto: UpdateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        return this.maintenanceUsecase.update(maintenanceId, updateMaintenanceDto);
    }

    @ApiTags('sprint0.3')
    @Delete(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 삭제' })
    @ApiDataResponse({
        description: '정비 이력이 삭제되었습니다.',
    })
    async remove(@Param('maintenanceId') maintenanceId: string): Promise<void> {
        return this.maintenanceUsecase.delete(maintenanceId);
    }
}
