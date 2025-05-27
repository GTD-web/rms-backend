import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { EmployeeService } from '@src/application/employee/employee.service';
import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';

@ApiTags('3. 자원 관리자 - 관리자 페이지')
@ApiBearerAuth()
@Controller('v1/admin/resource-managers')
@Roles(Role.SYSTEM_ADMIN)
export class AdminResourceManagerController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @ApiOperation({ summary: '자원 관리자 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '자원 관리자 목록 조회 성공',
        type: [EmplyeesByDepartmentResponseDto],
    })
    async findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeService.findResourceManagers();
    }
}
