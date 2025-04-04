import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEventHandler {
    constructor(private readonly employeeService: EmployeeService) {}

    @OnEvent('create.employee')
    async handleEmployeeCreated(payload: any) {
        // 새로운 Employee가 생성되면 캐시를 갱신하거나 필요한 처리를 수행
        await this.employeeService.findAllEmplyeesByDepartment();
    }

    @OnEvent('find.employee')
    async handleFindEmployee(payload: any) {
        await this.employeeService.findAllEmplyeesByDepartment();
    }

    @OnEvent('update.employee')
    async handleEmployeeUpdated(payload: any) {
        // Employee 정보가 업데이트되면 캐시를 갱신하거나 필요한 처리를 수행
        await this.employeeService.findAllEmplyeesByDepartment();
    }

    @OnEvent('delete.employee')
    async handleEmployeeDeleted(payload: any) {
        // Employee가 삭제되면 캐시를 갱신하거나 필요한 처리를 수행
        await this.employeeService.findAllEmplyeesByDepartment();
    }
}
