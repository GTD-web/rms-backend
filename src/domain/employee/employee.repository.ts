import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '@libs/entities/employee.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class EmployeeRepository extends BaseRepository<Employee> {
    constructor(
        @InjectRepository(Employee)
        repository: Repository<Employee>,
    ) {
        super(repository);
    }

    // 필요에 따라 Employee 관련 메서드를 추가하세요.
}
