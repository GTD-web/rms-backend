import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRepositoryPort } from '@resource/modules/employee/domain/ports/employee.repository.port';
import { MMSEmployeeResponseDto } from '../dtos/mms-employee-response.dto';
import { Employee } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class EmployeeService {
    constructor(
        @Inject('EmployeeRepositoryPort')
        private readonly employeeRepository: EmployeeRepositoryPort,
    ) {}

    create(employee: MMSEmployeeResponseDto) {
        const employeeEntity = new Employee();
        employeeEntity.name = employee.name;
        employeeEntity.employeeNumber = employee.employee_number;
        employeeEntity.department = employee.department;
        employeeEntity.position = employee.rank;
        return employeeEntity;
    }

    async save(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        return this.employeeRepository.save(employee, repositoryOptions);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.findAll();
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
        return this.employeeRepository.findByEmployeeNumber(employeeNumber);
    }

    async update(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        return this.employeeRepository.update(employee.employeeId, employee, repositoryOptions);
    }
}
