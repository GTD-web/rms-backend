import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmplyeesByDepartmentResponseDto } from '../dtos/employees-by-department-response.dto';
import { MMSEmployeeResponseDto } from '../dtos/mms-employee-response.dto';
import axios from 'axios';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';
import { Employee } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { EventEmitter2 } from '@nestjs/event-emitter/dist';

@Injectable()
export class EmployeeUseCase {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async findEmployee(employeeNumber: string, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        let employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
        if (!employee) {
            await this.syncEmployee(employeeNumber);
            employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
            if (!employee) {
                throw new NotFoundException('존재하지 않는 사용자입니다.');
            }
        }
        return employee;
    }

    async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const employees = await this.employeeService.findAll();
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

    async updateEmployee(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        return await this.employeeService.update(employee, repositoryOptions);
    }

    async getEmployee(employeeNumber: string): Promise<MMSEmployeeResponseDto> {
        const employee = await axios.get(
            `${process.env.METADATA_MANAGER_URL}/api/employees?employeeNumber=${employeeNumber}&detailed=true`,
        );
        return new MMSEmployeeResponseDto(employee.data);
    }

    async getEmployees(): Promise<MMSEmployeeResponseDto[]> {
        const employees = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const result: MMSEmployeeResponseDto[] = [];
        employees.data.forEach((employee) => {
            result.push(new MMSEmployeeResponseDto(employee));
        });
        return result;
    }

    async syncEmployee(employeeNumber: string): Promise<void> {
        const employee = await this.getEmployee(employeeNumber);
        const user = await this.employeeService.findByEmployeeNumber(employee.employee_number);

        try {
            if (user) {
                user.name = employee.name;
                user.employeeNumber = employee.employee_number;
                user.department = employee.department;
                user.position = employee.rank;
                await this.employeeService.save(user);
            } else {
                await this.employeeService.save(this.employeeService.create(employee));
            }
            if (employee.phone_number) {
                this.eventEmitter.emit('update.user.mobile', {
                    employeeId: user.employeeId,
                    mobile: employee.phone_number,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async syncEmployees(): Promise<void> {
        const employees = await this.getEmployees();
        for (const employee of employees) {
            const user = await this.employeeService.findByEmployeeNumber(employee.employee_number);
            try {
                if (user) {
                    user.name = employee.name;
                    user.employeeNumber = employee.employee_number;
                    user.department = employee.department;
                    user.position = employee.rank;
                    await this.employeeService.save(user);
                } else {
                    await this.employeeService.save(this.employeeService.create(employee));
                }
                if (employee.phone_number) {
                    this.eventEmitter.emit('update.user.mobile', {
                        employeeId: user.employeeId,
                        mobile: employee.phone_number,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
