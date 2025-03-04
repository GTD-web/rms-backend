import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Employee } from '../../domain/models/employee';
import { EmployeeRepositoryPort } from '../../domain/ports/employee.repository.port';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
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

    // async create(createEmployeeDto: CreateEmployeeDto, repositoryOptions?: RepositoryOptions): Promise<Employee> {
    //   const employee = new Employee(createEmployeeDto);
    //   return this.employeeRepository.save(employee, repositoryOptions);
    // }

    // async findAll(repositoryOptions?: RepositoryOptions): Promise<Employee[]> {
    //   return this.employeeRepository.findAll(repositoryOptions);
    // }

    // async findOne(id: string, repositoryOptions?: RepositoryOptions): Promise<Employee> {
    //   const employee = await this.employeeRepository.findById(id, repositoryOptions);
    //   if (!employee) {
    //     throw new NotFoundException('Employee not found');
    //   }
    //   return employee;
    // }

    // async update(id: string, updateData: Partial<CreateEmployeeDto>, repositoryOptions?: RepositoryOptions): Promise<Employee> {
    //   const employee = await this.findOne(id, repositoryOptions);
    //   employee.update(updateData);
    //   return this.employeeRepository.update(id, employee, repositoryOptions);
    // }

    // async remove(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
    //   await this.employeeRepository.delete(id, repositoryOptions);
    // }

    // async findByEmployeeNumber(employeeNumber: string, repositoryOptions?: RepositoryOptions): Promise<Employee> {
    //   const employee = await this.employeeRepository.findByEmployeeNumber(employeeNumber, repositoryOptions);
    //   if (!employee) {
    //     throw new NotFoundException('Employee not found');
    //   }
    //   return employee;
    // }
}
