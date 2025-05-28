import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { ConsumableService } from '@src/application/resource/vehicle/services/consumable.service';

@ApiTags('4. 차량 소모품 ')
@Controller('v1/consumables')
@ApiBearerAuth()
@Roles(Role.RESOURCE_ADMIN)
export class UserConsumableController {
    constructor(private readonly consumableService: ConsumableService) {}

    @Get(':consumableId')
    @ApiOperation({ summary: '소모품 상세 조회' })
    @ApiDataResponse({
        status: 200,
        description: '소모품을 성공적으로 조회했습니다.',
        type: ConsumableResponseDto,
    })
    async findOne(@User() user: Employee, @Param('consumableId') consumableId: string): Promise<ConsumableResponseDto> {
        console.log('consumableId', consumableId);
        return this.consumableService.findOne(user, consumableId);
    }
}
