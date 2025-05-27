import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Role } from '@libs/enums/role-type.enum';
import { In, Not, Raw } from 'typeorm';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/dtos.index';
import { EmployeeService } from '@resource/modules/employee/application/services/employee.service';

@Injectable()
export class ResourceManagerUseCase {
    constructor(private readonly employeeService: EmployeeService) {}

    async findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const resourceManagers = await this.employeeService.findAll({
            where: {
                roles: Raw(() => `'${Role.RESOURCE_ADMIN}' = ANY("roles")`),
                department: Not(In(['퇴사', '관리자'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
            },
        });

        const departments = new Map<string, EmployeeResponseDto[]>();

        resourceManagers.forEach((resourceManager) => {
            if (!departments.has(resourceManager.department)) {
                departments.set(resourceManager.department, []);
            }
            departments.get(resourceManager.department)?.push(resourceManager);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
}
