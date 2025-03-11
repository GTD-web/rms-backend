import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-consumable.dto';
import { UpdateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/update-consumable.dto';
import { ConsumableResponseDto } from '@resource/modules/resource/vehicle/application/dtos/consumable-response.dto';

@ApiTags('차량 소모품')
@Controller('resources/:resourceId/consumables')
export class ConsumableController {
    constructor(private readonly consumableService: ConsumableService) {}

    @ApiTags('sprint0.3-')
    @Post()
    @ApiOperation({ summary: '소모품 교체 이력 등록' })
    @ApiDataResponse({
        status: 201,
        description: '소모품 교체 이력이 성공적으로 등록되었습니다.',
        type: ConsumableResponseDto,
    })
    async create(
        @Param('resourceId') resourceId: string,
        @Body() createConsumableDto: CreateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        // const consumable = await this.consumableService.create({
        //     ...createConsumableDto,
        //     vehicleId: resourceId
        // });
        return null;
    }

    @ApiTags('sprint0.3-')
    @Get()
    @ApiOperation({ summary: '소모품 교체 이력 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 교체 이력 목록을 성공적으로 조회했습니다.',
        type: [ConsumableResponseDto],
    })
    async findAll(@Param('resourceId') resourceId: string): Promise<ConsumableResponseDto[]> {
        //   const consumables = await this.consumableService.findByVehicleId(resourceId);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Get(':id')
    @ApiOperation({ summary: '소모품 교체 이력 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 교체 이력을 성공적으로 조회했습니다.',
        type: ConsumableResponseDto,
    })
    async findOne(@Param('resourceId') resourceId: string, @Param('id') id: string): Promise<ConsumableResponseDto> {
        // const consumable = await this.consumableService.findById(id);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Patch(':id')
    @ApiOperation({ summary: '소모품 교체 이력 수정' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 교체 이력이 성공적으로 수정되었습니다.',
        type: ConsumableResponseDto,
    })
    async update(
        @Param('resourceId') resourceId: string,
        @Param('id') id: string,
        @Body() updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        // const consumable = await this.consumableService.update(id, updateConsumableDto);
        return null;
    }

    @ApiTags('sprint0.3-')
    @Delete(':id')
    @ApiOperation({ summary: '소모품 교체 이력 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 교체 이력이 성공적으로 삭제되었습니다.',
    })
    async remove(@Param('resourceId') resourceId: string, @Param('id') id: string): Promise<void> {
        // await this.consumableService.remove(id);
        return null;
    }
}
