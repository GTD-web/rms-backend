import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from '../employee.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from '@libs/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';
import {
    MMSEmployeeResponseDto,
    MMSWebhookRequestDto,
} from '@resource/application/employee/dtos/mms-employee-response.dto';

@ApiTags('5. 직원 ')
@Public()
@Controller('v1/employees')
export class EmployeeWebhookController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('sync')
    @ApiExcludeEndpoint()
    async syncEmployees() {
        return await this.employeeService.syncEmployees();
    }

    @Post('webhook/create')
    @ApiExcludeEndpoint()
    @Public()
    @Throttle(5, 60) // 60초 동안 5번만 허용
    async webhookCreate(@Body() body: MMSEmployeeResponseDto) {
        console.log('created employee', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }

    @Post('webhook/update')
    @ApiExcludeEndpoint()
    @Public()
    @Throttle(5, 60) // 60초 동안 5번만 허용
    async webhookUpdate(@Body() body: MMSEmployeeResponseDto) {
        console.log('updated employee', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }

    @Post('webhook/position_changed')
    @ApiExcludeEndpoint()
    @Public()
    @Throttle(5, 60) // 60초 동안 5번만 허용
    async webhookPositionChanged(@Body() body: MMSEmployeeResponseDto) {
        console.log('position changed', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }

    @Post('webhook/department_changed')
    @ApiExcludeEndpoint()
    @Public()
    @Throttle(5, 60) // 60초 동안 5번만 허용
    async webhookDepartmentChanged(@Body() body: MMSEmployeeResponseDto) {
        console.log('department changed', body);
        await this.employeeService.syncEmployees(body.employee_number);
    }

    @Post('webhook/delete')
    @ApiExcludeEndpoint()
    @Public()
    @Throttle(5, 60) // 60초 동안 5번만 허용
    async webhookDelete(@Body() body: MMSEmployeeResponseDto) {
        console.log('deleted employee', body);
        // await this.employeeUseCase.syncEmployee(body.payload.employee_number);
    }
}
