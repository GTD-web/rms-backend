import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { EmployeeService } from '@resource/modules/employee/application/services/employee.service';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { EmplyeesByDepartmentResponseDto } from '@resource/modules/employee/application/dtos/employees-by-department-response.dto';
import { EmployeeUseCase } from '@resource/modules/employee/application/usecases/employee.usecase';

@ApiTags('직원')
@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeUseCase: EmployeeUseCase) {}

    @ApiTags('sprint0.1')
    @Get('department')
    @Roles(Role.USER)
    @ApiOperation({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' })
    @ApiDataResponse({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [EmplyeesByDepartmentResponseDto],
    })
    async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeUseCase.findAllEmplyeesByDepartment();
    }

    @Get('sync')
    async syncEmployees() {
        return await this.employeeUseCase.syncEmployees();
    }

    @Post('webhook/create')
    async webhookCreate(@Body() body: any) {
        console.log('created employee', body);
        await this.employeeUseCase.syncEmployees();
    }

    @Post('webhook/update')
    async webhookUpdate(@Body() body: any) {
        console.log('updated employee', body);
        await this.employeeUseCase.syncEmployees();
    }

    @Post('webhook/position_changed')
    async webhookPositionChanged(@Body() body: any) {
        console.log('position changed', body);
        await this.employeeUseCase.syncEmployees();
    }

    @Post('webhook/department_changed')
    async webhookDepartmentChanged(@Body() body: any) {
        console.log('department changed', body);
        await this.employeeUseCase.syncEmployees();
    }

    @Post('webhook/delete')
    async webhookDelete(@Body() body: any) {
        console.log('deleted employee', body);
        await this.employeeUseCase.syncEmployees();
    }
}
