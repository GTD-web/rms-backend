import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { EmployeeService } from '@resource/modules/employee/application/services/employee.service';
import { CreateEmployeeDto } from '@resource/modules/employee/application/dtos/create-employee.dto';
import { UpdateEmployeeDto } from '@resource/modules/employee/application/dtos/update-employee.dto';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { EmplyeesByDepartmentResponseDto } from '@resource/modules/employee/application/dtos/employees-by-department-response.dto';
import { Public } from '@libs/decorators/public.decorator';

@ApiTags('직원')
@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    // @Post()
    // @ApiOperation({ summary: '직원 생성' })
    // @ApiDataResponse({
    //   status: 201,
    //   description: '직원이 성공적으로 생성되었습니다.',
    //   type: EmployeeResponseDto
    // })
    // async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    //   return this.employeeService.create(createEmployeeDto);
    // }

    // @Get()
    // @Roles(Role.USER)
    // @ApiOperation({ summary: '직원 목록 조회' })
    // @ApiDataResponse({
    //   status: 200,
    //   description: '직원 목록을 성공적으로 조회했습니다.',
    //   type: [EmployeeResponseDto]
    // })
    // async findAll(): Promise<EmployeeResponseDto[]> {
    //   return this.employeeService.findAll();
    // }

    @ApiTags('sprint0.1')
    @Get('department')
    @Roles(Role.USER)
    @ApiOperation({ summary: '부서별 직원 목록 조회 #참석자 설정 모달' })
    @ApiDataResponse({
        status: 200,
        description: '부서별 직원 목록을 성공적으로 조회했습니다.',
        type: [EmplyeesByDepartmentResponseDto],
    })
    async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeService.findAllEmplyeesByDepartment();
    }

    // @Get(':employeeId')
    // @Roles(Role.USER)
    // @ApiOperation({ summary: '직원 상세 조회' })
    // @ApiDataResponse({
    //   status: 200,
    //   description: '직원을 성공적으로 조회했습니다.',
    //   type: EmployeeResponseDto
    // })
    // async findOne(@Param('employeeId') employeeId: string): Promise<EmployeeResponseDto> {
    //   return this.employeeService.findOne(employeeId);
    // }

    // @Patch(':employeeId')
    // @ApiOperation({ summary: '직원 정보 수정' })
    // @ApiDataResponse({
    //   status: 200,
    //   description: '직원 정보가 성공적으로 수정되었습니다.',
    //   type: EmployeeResponseDto
    // })
    // async update(
    //   @Param('employeeId') employeeId: string,
    //   @Body() updateEmployeeDto: UpdateEmployeeDto
    // ): Promise<EmployeeResponseDto> {
    //   return this.employeeService.update(employeeId, updateEmployeeDto);
    // }

    // @Delete(':employeeId')
    // @ApiOperation({ summary: '직원 삭제' })
    // @ApiDataResponse({
    //   status: 200,
    //   description: '직원이 성공적으로 삭제되었습니다.'
    // })
    // async remove(@Param('employeeId') employeeId: string): Promise<void> {
    //   return this.employeeService.remove(employeeId);
    // }
}
