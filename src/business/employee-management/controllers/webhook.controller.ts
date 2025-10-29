import { Controller, Get, UseInterceptors, Req } from '@nestjs/common';
import { EmployeeManagementService } from '../employee-management.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@libs/decorators/public.decorator';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('v2 직원')
@Public()
@Controller('v1/employees')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class EmployeeWebhookController {
    constructor(private readonly employeeManagementService: EmployeeManagementService) {}

    @Get('sync')
    // @ApiExcludeEndpoint()
    async syncEmployees(@Req() req: Request) {
        const authorization = req.headers['authorization'];
        return await this.employeeManagementService.syncEmployees(authorization);
    }
}
