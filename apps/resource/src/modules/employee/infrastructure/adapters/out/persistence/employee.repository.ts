import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee as EmployeeEntity } from '@libs/entities';
import { Employee } from '@resource/modules/employee/domain/models/employee';
import { EmployeeRepositoryPort } from '@resource/modules/employee/domain/ports/employee.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { EmployeeMapper } from '@resource/modules/employee/application/mappers/employee.mapper';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryPort {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly repository: Repository<EmployeeEntity>,
    ) {}

    async save(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        const entity = EmployeeMapper.toEntity(employee);
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        const savedEntity = await repository.save(entity);
        return EmployeeMapper.toDomain(savedEntity);
    }

    async findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Employee | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeId: id } });
        return entity ? EmployeeMapper.toDomain(entity) : null;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Employee[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        const entities = await repository.find();
        return entities.map((entity) => EmployeeMapper.toDomain(entity));
    }

    async update(id: string, employee: Partial<Employee>, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        await repository.update({ employeeId: id }, EmployeeMapper.toEntity(employee));
        const updated = await repository.findOne({ where: { employeeId: id } });
        if (!updated) throw new NotFoundException('Employee not found');
        return EmployeeMapper.toDomain(updated);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        await repository.delete({ employeeId: id });
    }

    async findByEmployeeNumber(
        employeeNumber: string,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Employee | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeEntity)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeNumber } });
        return entity ? EmployeeMapper.toDomain(entity) : null;
    }
}
