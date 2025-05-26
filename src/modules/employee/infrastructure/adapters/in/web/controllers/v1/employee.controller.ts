import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { Roles } from '@libs/decorators/role.decorator';
import { EmplyeesByDepartmentResponseDto } from '@resource/modules/employee/application/dtos/employees-by-department-response.dto';
import { EmployeeUseCase } from '@resource/modules/employee/application/usecases/employee.usecase';
import { Public } from '@libs/decorators/public.decorator';
import {
    MMSEmployeeResponseDto,
    MMSWebhookRequestDto,
} from '@resource/modules/employee/application/dtos/mms-employee-response.dto';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

@ApiTags('5. 직원 - 사용자 페이지')
@ApiBearerAuth()
@Controller('v1/employees')
export class UserEmployeeController {
    constructor(private readonly employeeUseCase: EmployeeUseCase) {}

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

    // @Get('sync')
    // @ApiExcludeEndpoint()
    // async syncEmployees() {
    //     return await this.employeeUseCase.syncEmployees();
    // }

    // @Post('webhook/create')
    // @ApiExcludeEndpoint()
    // @Public()
    // @Throttle(5, 60) // 60초 동안 5번만 허용
    // async webhookCreate(@Body() body: MMSWebhookRequestDto) {
    //     console.log('created employee', body);
    //     await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    // }

    // @Post('webhook/update')
    // @ApiExcludeEndpoint()
    // @Public()
    // @Throttle(5, 60) // 60초 동안 5번만 허용
    // async webhookUpdate(@Body() body: MMSWebhookRequestDto) {
    //     console.log('updated employee', body);
    //     await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    // }

    // @Post('webhook/position_changed')
    // @ApiExcludeEndpoint()
    // @Public()
    // @Throttle(5, 60) // 60초 동안 5번만 허용
    // async webhookPositionChanged(@Body() body: MMSWebhookRequestDto) {
    //     console.log('position changed', body);
    //     await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    // }

    // @Post('webhook/department_changed')
    // @ApiExcludeEndpoint()
    // @Public()
    // @Throttle(5, 60) // 60초 동안 5번만 허용
    // async webhookDepartmentChanged(@Body() body: MMSWebhookRequestDto) {
    //     console.log('department changed', body);
    //     await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    // }

    // @Post('webhook/delete')
    // @ApiExcludeEndpoint()
    // @Public()
    // @Throttle(5, 60) // 60초 동안 5번만 허용
    // async webhookDelete(@Body() body: MMSWebhookRequestDto) {
    //     console.log('deleted employee', body);
    //     // await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    // }
}
