import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRepositoryPort } from '@resource/modules/employee/domain/ports/employee.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { EmplyeesByDepartmentResponseDto } from '../dtos/employees-by-department-response.dto';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';
import axios from 'axios';
import { MMSEmployeeResponseDto } from '../dtos/mms-employee-response.dto';
import { Employee } from '@libs/entities';

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

    async getEmployees(): Promise<MMSEmployeeResponseDto[]> {
        const employees = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const result: MMSEmployeeResponseDto[] = [];
        employees.data.forEach((employee) => {
            console.log(employee);
            result.push(new MMSEmployeeResponseDto(employee));
        });
        return result;
    }

    async syncEmployees() {
        const employees = await this.getEmployees();
        for (const employee of employees) {
            const user = await this.employeeRepository.findByEmployeeNumber(employee.employee_number);
            if (user) {
                user.name = employee.name;
                user.employeeNumber = employee.employee_number;
                user.department = employee.department;
                user.position = employee.rank;
                await this.employeeRepository.save(user);
            } else {
                await this.employeeRepository.save(this.create(employee));
            }
        }
    }

    create(employee: MMSEmployeeResponseDto) {
        const employeeEntity = new Employee();
        employeeEntity.name = employee.name;
        employeeEntity.employeeNumber = employee.employee_number;
        employeeEntity.department = employee.department;
        employeeEntity.position = employee.rank;
        return employeeEntity;
    }
}
