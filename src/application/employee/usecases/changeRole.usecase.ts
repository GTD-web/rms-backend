import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@libs/enums/role-type.enum';
import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class ChangeRoleUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(changeRoleDto: ChangeRoleDto): Promise<void> {
        const employee = await this.employeeService.findByEmployeeId(changeRoleDto.employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        employee.roles = changeRoleDto.isResourceAdmin
            ? [...employee.roles, Role.RESOURCE_ADMIN]
            : employee.roles.filter((role) => role !== Role.RESOURCE_ADMIN);
        await this.employeeService.update(employee.employeeId, employee);
    }
}
