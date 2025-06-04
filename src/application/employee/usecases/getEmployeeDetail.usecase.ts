import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@libs/enums/role-type.enum';
import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';

@Injectable()
export class GetEmployeeDetailUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string): Promise<UserResponseDto> {
        const employee = await this.employeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        return {
            employeeId: employee.employeeId,
            email: employee.email,
            mobile: employee.mobile,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            roles: employee.roles,
            isPushNotificationEnabled: employee.isPushNotificationEnabled,
        };
    }
}
