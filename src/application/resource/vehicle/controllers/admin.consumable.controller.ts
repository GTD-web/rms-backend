import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ConsumableService } from '@src/application/resource/vehicle/services/consumable.service';

@ApiTags('4. 차량 소모품 - 관리자 ')
@Controller('v1/admin/consumables')
@ApiBearerAuth()
@Roles(Role.SYSTEM_ADMIN)
export class AdminConsumableController {
    constructor(private readonly consumableService: ConsumableService) {}

    @Post()
    @ApiOperation({ summary: '소모품 등록' })
    @ApiDataResponse({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: ConsumableResponseDto,
    })
    async create(
        @User() user: Employee,
        @Body() createConsumableDto: CreateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        return this.consumableService.save(user, createConsumableDto);
    }

    @Get('vehicle/:vehicleInfoId')
    @ApiOperation({ summary: '소모품 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [ConsumableResponseDto],
    })
    async findAll(
        @User() user: Employee,
        @Param('vehicleInfoId') vehicleInfoId: string,
    ): Promise<ConsumableResponseDto[]> {
        return this.consumableService.findAll(user, vehicleInfoId);
    }

    @Get(':consumableId')
    @ApiOperation({ summary: '소모품 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: ConsumableResponseDto,
    })
    async findOne(@User() user: Employee, @Param('consumableId') consumableId: string): Promise<ConsumableResponseDto> {
        return this.consumableService.findOne(user, consumableId);
    }

    @Patch(':consumableId')
    @ApiOperation({ summary: '소모품 수정' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: ConsumableResponseDto,
    })
    async update(
        @Param('consumableId') consumableId: string,
        @User() user: Employee,
        @Body() updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        return this.consumableService.update(user, consumableId, updateConsumableDto);
    }

    @Delete(':consumableId')
    @ApiOperation({ summary: '소모품 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    })
    async remove(@User() user: Employee, @Param('consumableId') consumableId: string): Promise<void> {
        await this.consumableService.delete(user, consumableId);
    }
}
