import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ConsumableResponseDto } from '@resource/modules/resource/vehicle/application/dtos/vehicle-response.dto';
import { ConsumableUsecase } from '@resource/modules/resource/vehicle/application/usecases/consumable.usecase';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';

@ApiTags('4. 차량 소모품 - 사용자 페이지')
@Controller('v1/consumables')
@ApiBearerAuth()
@Roles(Role.RESOURCE_ADMIN)
export class UserConsumableController {
    constructor(private readonly consumableUsecase: ConsumableUsecase) {}

    @Get(':consumableId')
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
}
