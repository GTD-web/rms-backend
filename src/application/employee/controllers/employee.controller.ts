import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../employee.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { EmplyeesByDepartmentResponseDto } from '@src/modules/employee/application/dtos/employees-by-department-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';

@ApiTags('5. 직원 - 사용자 페이지')
@ApiBearerAuth()
@Controller('v1/employees')
export class EmployeeWebhookController {
    constructor(private readonly employeeService: EmployeeService) {}

    // @Get('department')
    // @Roles(Role.USER)
    // @ApiOperation({ summary: '부서별 직원 목록 조회 #사용자/참석자설정/모달' })
    // @ApiDataResponse({
    //     status: 200,
    //     description: '부서별 직원 목록을 성공적으로 조회했습니다.',
    //     type: [EmplyeesByDepartmentResponseDto],
    // })
    // async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
    //     return this.employeeService.findAllEmplyeesByDepartment();
    // }
}
