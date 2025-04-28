import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeService } from '@resource/modules/employee/application/services/employee.service';
import { Employee } from '@libs/entities';
import { Public } from '@libs/decorators/public.decorator';
import { MMSEmployeeResponseDto } from '@resource/modules/employee/application/dtos/mms-employee-response.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@ApiTags('Employee Domain Test')
@Controller('domain/employees')
@Public()
export class EmployeeDomainController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @ApiOperation({ summary: '모든 직원 조회' })
    @ApiResponse({ status: 200, description: '모든 직원 조회 성공', type: [Employee] })
    async findAll(): Promise<Employee[]> {
        return this.employeeService.findAll();
    }

    @Get(':employeeNumber')
    @ApiOperation({ summary: '사원 번호로 직원 조회' })
    @ApiResponse({ status: 200, description: '직원 조회 성공', type: Employee })
    async findByEmployeeNumber(@Param('employeeNumber') employeeNumber: string): Promise<Employee> {
        return this.employeeService.findByEmployeeNumber(employeeNumber);
    }

    @Post()
    @ApiOperation({ summary: '직원 생성 및 저장' })
    @ApiResponse({ status: 201, description: '직원 저장 성공', type: Employee })
    async save(@Body() employeeDto: MMSEmployeeResponseDto): Promise<Employee> {
        const employee = this.employeeService.create(employeeDto);
        return this.employeeService.save(employee);
    }

    @Patch(':employeeId')
    @ApiOperation({ summary: '직원 정보 업데이트' })
    @ApiResponse({ status: 200, description: '직원 정보 업데이트 성공', type: Employee })
    async update(@Param('employeeId') employeeId: string, @Body() employee: Employee): Promise<Employee> {
        employee.employeeId = employeeId;
        return this.employeeService.update(employee);
    }
}
