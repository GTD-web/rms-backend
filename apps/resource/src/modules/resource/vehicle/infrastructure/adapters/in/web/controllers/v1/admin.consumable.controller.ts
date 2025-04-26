import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { ConsumableUsecase } from '@resource/modules/resource/vehicle/application/usecases/consumable.usecase';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';

@ApiTags('4. 차량 소모품 - 관리자 페이지')
@Controller('v1/admin/consumables')
@ApiBearerAuth()
export class AdminConsumableController {
    constructor(private readonly consumableUsecase: ConsumableUsecase) {}
    // check api
    @Post()
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '소모품 등록' })
    @ApiDataResponse({
        status: 201,
        description: '소모품이 성공적으로 등록되었습니다.',
        type: ConsumableResponseDto,
    })
    async create(
        @User() user: UserEntity,
        @Body() createConsumableDto: CreateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.save(user, createConsumableDto);
        return consumable;
    }
    // check api
    @Get('vehicle/:vehicleInfoId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '소모품 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품 목록을 성공적으로 조회했습니다.',
        type: [ConsumableResponseDto],
    })
    async findAll(
        @User() user: UserEntity,
        @Param('vehicleInfoId') vehicleInfoId: string,
    ): Promise<ConsumableResponseDto[]> {
        const consumables = await this.consumableUsecase.findAll(user, {
            where: {
                vehicleInfoId: vehicleInfoId,
            },
        });
        return consumables.map((consumable) => ({
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        }));
    }
    // check api
    @Get(':consumableId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '소모품 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: ConsumableResponseDto,
    })
    async findOne(
        @User() user: UserEntity,
        @Param('consumableId') consumableId: string,
    ): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.findOne(user, {
            where: {
                consumableId: consumableId,
            },
            relations: ['maintenances'],
        });
        return {
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
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
    // check api
    @Patch(':consumableId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '소모품 수정' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 수정되었습니다.',
        type: ConsumableResponseDto,
    })
    async update(
        @Param('consumableId') consumableId: string,
        @User() user: UserEntity,
        @Body() updateConsumableDto: UpdateConsumableDto,
    ): Promise<ConsumableResponseDto> {
        const consumable = await this.consumableUsecase.update(user, consumableId, updateConsumableDto);
        return {
            consumableId: consumable.consumableId,
            vehicleInfoId: consumable.vehicleInfoId,
            name: consumable.name,
            replaceCycle: consumable.replaceCycle,
            notifyReplacementCycle: consumable.notifyReplacementCycle,
        };
    }
    // check api
    @Delete(':consumableId')
    @Roles(Role.RESOURCE_ADMIN, Role.SYSTEM_ADMIN)
    @ApiOperation({ summary: '소모품 삭제' })
    @ApiDataResponse({
        status: 200,
        description: '소모품이 성공적으로 삭제되었습니다.',
    })
    async remove(@User() user: UserEntity, @Param('consumableId') consumableId: string): Promise<void> {
        await this.consumableUsecase.delete(user, consumableId);
    }
}
