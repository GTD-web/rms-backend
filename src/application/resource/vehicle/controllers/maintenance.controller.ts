import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { MaintenanceService } from '@src/application/resource/vehicle/services/maintenance.service';

@ApiTags('4. 차량 정비 이력 ')
@Controller('v1/maintenances')
@ApiBearerAuth()
@Roles(Role.RESOURCE_ADMIN)
export class UserMaintenanceController {
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
}
