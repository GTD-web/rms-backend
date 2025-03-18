import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRepositoryPort } from '@resource/modules/employee/domain/ports/employee.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { EmplyeesByDepartmentResponseDto } from '../dtos/employees-by-department-response.dto';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @Inject('EmployeeRepositoryPort')
        private readonly employeeRepository: EmployeeRepositoryPort,
    ) {}

    async findAllEmplyeesByDepartment(
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmplyeesByDepartmentResponseDto[]> {
        const employees = await this.employeeRepository.findAll();
        const departments = new Map<string, EmployeeResponseDto[]>();

        employees.forEach((employee) => {
            if (!departments.has(employee.department)) {
                departments.set(employee.department, []);
            }
            departments.get(employee.department)?.push(employee);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
}
