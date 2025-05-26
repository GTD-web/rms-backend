import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '@libs/entities';
import { GetEmployeeUsecase } from './usecases/getEmployee.usecase';
import { SyncEmployeeUsecase } from './usecases/syncEmployee.usecase';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly getEmployeeUsecase: GetEmployeeUsecase,
        private readonly syncEmployeeUsecase: SyncEmployeeUsecase,
    ) {}

    async syncEmployees(employeeNumber?: string): Promise<void> {
        const employees = await this.getEmployeeUsecase.execute(employeeNumber);
        await this.syncEmployeeUsecase.execute(employees);
    }

    // async findAllEmplyeesByDepartment(): Promise<EmplyeesByDepartmentResponseDto[]> {
    //     return this.employeeRepository.findAllEmplyeesByDepartment();
    // }
}
