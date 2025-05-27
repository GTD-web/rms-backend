import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@libs/enums/role-type.enum';
import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CheckPasswordUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, password: string): Promise<boolean> {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        return bcrypt.compare(password, employee.password);
    }
}
