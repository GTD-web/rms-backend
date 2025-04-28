import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeNotificationService } from '@resource/modules/notification/application/services/employee-notification.service';
import { EmployeeNotification } from '@libs/entities';
import { Public } from '@libs/decorators/public.decorator';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@ApiTags('Employee Notification Domain Test')
@Controller('domain/employee-notifications')
@Public()
export class EmployeeNotificationDomainController {
    constructor(private readonly employeeNotificationService: EmployeeNotificationService) {}

    @Get()
    @ApiOperation({ summary: '모든 직원 알림 조회' })
    @ApiResponse({ status: 200, description: '모든 직원 알림 조회 성공', type: [EmployeeNotification] })
    async findAll(): Promise<EmployeeNotification[]> {
        return this.employeeNotificationService.findAll();
    }

    @Get('one')
    @ApiOperation({ summary: '직원 알림 조회' })
    @ApiResponse({ status: 200, description: '직원 알림 조회 성공', type: EmployeeNotification })
    async findOne(): Promise<EmployeeNotification> {
        return this.employeeNotificationService.findOne();
    }

    @Post()
    @ApiOperation({ summary: '직원 알림 생성' })
    @ApiResponse({ status: 201, description: '직원 알림 생성 성공', type: EmployeeNotification })
    async create(@Body() createEmployeeNotificationDto: CreateEmployeeNotificationDto): Promise<EmployeeNotification> {
        return this.employeeNotificationService.save(createEmployeeNotificationDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '직원 알림 업데이트' })
    @ApiResponse({ status: 200, description: '직원 알림 업데이트 성공', type: EmployeeNotification })
    async update(
        @Param('id') id: string,
        @Body() updateEmployeeNotificationDto: Partial<EmployeeNotification>,
    ): Promise<EmployeeNotification> {
        return this.employeeNotificationService.update(id, updateEmployeeNotificationDto);
    }
}
