import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmployeeUseCase } from '../usecases/employee.usecase';
import { Employee } from '@libs/entities';
@Injectable()
export class EmployeeEventHandler {
    constructor(private readonly employeeUseCase: EmployeeUseCase) {}

    @OnEvent('find.employee')
    async handleFindEmployee(payload: any): Promise<Employee> {
        console.log('payload', payload);
        return await this.employeeUseCase.findEmployee(payload.employeeNumber, { queryRunner: payload.queryRunner });
    }

    @OnEvent('update.employee')
    async handleUpdateEmployee(payload: any): Promise<Employee> {
        return await this.employeeUseCase.updateEmployee(payload.employee, { queryRunner: payload.queryRunner });
    }
}
