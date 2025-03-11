import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { MaintenanceService } from '@resource/modules/resource/vehicle/application/services/maintenance.service';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-maintenance.dto';
import { MaintenanceResponseDto } from '@resource/modules/resource/vehicle/application/dtos/maintenance-response.dto';

@ApiTags('정비 이력')
@Controller('maintenances')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) {}

    @ApiTags('sprint0.3-')
    @Post()
    @ApiOperation({ summary: '정비 이력 생성' })
    @ApiDataResponse({
        status: 201,
        description: '정비 이력이 생성되었습니다.',
        type: MaintenanceResponseDto,
    })
    async create(@Body() createDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto> {
        // const maintenance = await this.maintenanceService.create(createDto);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Get(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 조회' })
    @ApiDataResponse({
        description: '정비 이력을 조회했습니다.',
        type: MaintenanceResponseDto,
    })
    async findOne(@Param('maintenanceId') maintenanceId: string): Promise<MaintenanceResponseDto> {
        // const maintenance = await this.maintenanceService.findById(maintenanceId);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Get('consumable/:consumableId')
    @ApiOperation({ summary: '소모품별 정비 이력 목록 조회' })
    @ApiDataResponse({
        description: '소모품의 정비 이력 목록을 조회했습니다.',
        type: [MaintenanceResponseDto],
    })
    async findByConsumable(@Param('consumableId') consumableId: string): Promise<MaintenanceResponseDto[]> {
        // const maintenances = await this.maintenanceService.findByConsumableId(consumableId);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Patch(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 수정' })
    @ApiDataResponse({
        description: '정비 이력이 수정되었습니다.',
        type: MaintenanceResponseDto,
    })
    async update(
        @Param('maintenanceId') maintenanceId: string,
        @Body() updateDto: UpdateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        // const maintenance = await this.maintenanceService.update(maintenanceId, updateDto);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Delete(':maintenanceId')
    @ApiOperation({ summary: '정비 이력 삭제' })
    @ApiDataResponse({
        description: '정비 이력이 삭제되었습니다.',
    })
    async remove(@Param('maintenanceId') maintenanceId: string): Promise<void> {
        return null;
    }
}
