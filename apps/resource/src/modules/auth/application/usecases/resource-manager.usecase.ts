import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Role } from '@libs/enums/role-type.enum';
import { In, Raw } from 'typeorm';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/dtos.index';

@Injectable()
export class ResourceManagerUseCase {
    constructor(private readonly userService: UserService) {}

    async findAllResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const resourceManagers = await this.userService.findAll({
            where: {
                roles: Raw(() => `'${Role.RESOURCE_ADMIN}' = ANY("roles")`),
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
