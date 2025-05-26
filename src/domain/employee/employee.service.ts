import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { BaseService } from '@libs/services/base.service';
import { Employee } from '@libs/entities/employee.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
@Injectable()
export class EmployeeService extends BaseService<Employee> {
    constructor(private readonly employeeRepository: EmployeeRepository) {
        super(employeeRepository);
    }

    // 예시: 직원 ID로 찾기
    async findByEmployeeId(employeeId: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { employeeId } });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
    // 필요에 따라 Employee 관련 메서드를 추가하세요.

    async findByEmail(email: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { employeeNumber } });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
}
