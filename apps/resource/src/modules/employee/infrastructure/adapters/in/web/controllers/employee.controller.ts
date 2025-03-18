import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { EmployeeService } from '@resource/modules/employee/application/services/employee.service';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { EmplyeesByDepartmentResponseDto } from '@resource/modules/employee/application/dtos/employees-by-department-response.dto';

@ApiTags('직원')
@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

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
        return this.employeeService.findAllEmplyeesByDepartment();
    }
}
