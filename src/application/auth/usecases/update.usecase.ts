import { Employee } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { Injectable } from '@nestjs/common';
import { SsoResponseDto } from '@src/application/auth/dto/sso-response.dto';
import { EmployeeService } from '@src/domain/employee/employee.service';

@Injectable()
export class UpdateUsecase {
    constructor(private readonly employeeService: EmployeeService) {}

    async execute(ssoResponse: SsoResponseDto): Promise<Employee> {
        const employee = await this.employeeService.findByEmployeeNumber(ssoResponse.employeeNumber);
        employee.password = ssoResponse.password;
        employee.mobile = ssoResponse.phoneNumber;
        employee.accessToken = ssoResponse.accessToken;
        employee.expiredAt = DateUtil.format(ssoResponse.expiresAt);
        employee.department = ssoResponse.department;
        employee.position = ssoResponse.position;

        return await this.employeeService.update(employee.employeeId, employee);
    }
}
