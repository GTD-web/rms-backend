import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';
import { Employee } from '@libs/entities/employee.entity';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class ValidateUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(email: string, password: string): Promise<Employee> {
        const employee = await this.employeeService.findByEmail(email);
        if (!employee) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        if (employee.position === '퇴사') {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        if (
            !employee.accessToken ||
            !employee.password ||
            (employee.expiredAt && DateUtil.now().format() > employee.expiredAt)
        ) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            console.log('패스워드 불일치, SSO 비밀번호 확인 필요');
            return null;
        }
        return employee;
    }
}
