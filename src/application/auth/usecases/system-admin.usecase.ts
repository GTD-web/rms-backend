import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { Role } from '@libs/enums/role-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class CheckSystemAdminUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(email: string, password: string) {
        const admin = await this.employeeService.findOne({ where: { email } });
        if (!admin || !admin.roles.includes(Role.SYSTEM_ADMIN)) {
            return {
                success: false,
                employee: null,
                message: ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND,
            };
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return {
                success: false,
                employee: null,
                message: ERROR_MESSAGE.BUSINESS.AUTH.INVALID_PASSWORD,
            };
        }

        return {
            success: true,
            employee: admin,
            message: '로그인 성공',
        };
    }
}
