import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { ConsumableUsecase } from '@resource/modules/resource/vehicle/application/usecases/consumable.usecase';

@ApiTags('차량 소모품')
@Controller('consumables')
export class ConsumableController {
    constructor(private readonly consumableUsecase: ConsumableUsecase) {}

    @ApiTags('sprint0.3')
    @Post()
    @ApiOperation({ summary: '소모품 등록' })
    @ApiDataResponse({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: ConsumableResponseDto,
    })
    async create(
        @Param('resourceId') resourceId: string,
        @Body() createConsumableDto: CreateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.save(createConsumableDto, {
            where: {
                vehicleId: resourceId,
            },
        });

        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }

    @ApiTags('sprint0.3')
    @Get()
    @ApiOperation({ summary: '소모품 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [ConsumableResponseDto],
    })
    async findAll(@Param('resourceId') resourceId: string): Promise<ConsumableResponseDto[]> {
        const consumables = await this.consumableUsecase.findAll({
            where: {
                vehicleId: resourceId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }

    @ApiTags('sprint0.3')
    @Get(':consumableId')
    @ApiOperation({ summary: '소모품 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: ConsumableResponseDto,
    })
    async findOne(@Param('consumableId') consumableId: string): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.findOne({
            where: {
                consumableId: consumableId,
            },
            relations: ['maintenances'],
        });
        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
            maintenances: consumable.maintenances.map((maintenance) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
            })),
        };
    }

    @ApiTags('sprint0.3')
    @Patch(':consumableId')
    @ApiOperation({ summary: '소모품 수정' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: ConsumableResponseDto,
    })
    async update(
        @Param('consumableId') consumableId: string,
        @Body() updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.update(consumableId, updateConsumableDto);
        return {
            consumableId: consumable.consumableId,
            resourceId: consumable.vehicleId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }

    @ApiTags('sprint0.3')
    @Delete(':consumableId')
    @ApiOperation({ summary: '소모품 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    })
    async remove(@Param('consumableId') consumableId: string): Promise<void> {
        await this.consumableUsecase.delete(consumableId);
    }
}
