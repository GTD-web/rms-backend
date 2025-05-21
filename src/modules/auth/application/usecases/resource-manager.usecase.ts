import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Role } from '@libs/enums/role-type.enum';
import { In, Not, Raw } from 'typeorm';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/dtos.index';

@Injectable()
export class ResourceManagerUseCase {
    constructor(private readonly userService: UserService) {}

    async findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const resourceManagers = await this.userService.findAll({
            where: {
                roles: Raw(() => `'${Role.RESOURCE_ADMIN}' = ANY("roles")`),
                employee: {
                    department: Not(In(['퇴사', '관리자'])),
                },
            },
            relations: ['employee'],
        });

        const departments = new Map<string, EmployeeResponseDto[]>();

        resourceManagers.forEach((resourceManager) => {
            if (!departments.has(resourceManager.employee.department)) {
                departments.set(resourceManager.employee.department, []);
            }
            departments.get(resourceManager.employee.department)?.push(resourceManager.employee);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
}
