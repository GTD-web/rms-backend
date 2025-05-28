import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Injectable()
export class ChangePasswordUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, password: string): Promise<void> {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        try {
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(
                `${ssoApiUrl}/api/auth/change-password`,
                {
                    newPassword: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${employee.accessToken}`,
                    },
                },
            );
            const data = response.data;
            console.log(data);
            employee.password = await bcrypt.hash(password, 10);
            await this.employeeService.update(employee.employeeId, employee);
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }
}
