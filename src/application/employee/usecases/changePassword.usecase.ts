import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, password: string): Promise<void> {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        employee.password = await bcrypt.hash(password, 10);
        await this.employeeService.update(employee.employeeId, employee);
    }
}
