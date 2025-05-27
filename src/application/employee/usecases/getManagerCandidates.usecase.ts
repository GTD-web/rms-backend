import { Injectable } from '@nestjs/common';
import { Role } from '@libs/enums/role-type.enum';
import { In, Not, Raw } from 'typeorm';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/dtos.index';
import { EmployeeService as EmployeeServiceDomain } from '@src/domain/employee/employee.service';

@Injectable()
export class GetManagerCandidatesUsecase {
    constructor(private readonly employeeService: EmployeeServiceDomain) {}

    async execute(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const resourceManagers = await this.employeeService.findAll({
            where: {
                department: Not(In(['퇴사', '관리자'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
                roles: true,
            },
        });

        const departments = new Map<string, EmployeeResponseDto[]>();

        resourceManagers.forEach((resourceManager) => {
            if (!departments.has(resourceManager.department)) {
                departments.set(resourceManager.department, []);
            }
            const data = {
                ...resourceManager,
                isResourceAdmin: resourceManager.roles.includes(Role.RESOURCE_ADMIN),
            };
            departments.get(resourceManager.department)?.push(data);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
}
