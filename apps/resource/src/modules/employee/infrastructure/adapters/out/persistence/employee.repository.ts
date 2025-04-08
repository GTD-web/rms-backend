import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '@libs/entities';
import { EmployeeRepositoryPort } from '@resource/modules/employee/domain/ports/employee.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryPort {
    constructor(
        @InjectRepository(Employee)
        private readonly repository: Repository<Employee>,
    ) {}

    async save(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        const savedEntity = await repository.save(employee);
        return savedEntity;
    }

    async findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Employee | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        const entity = await repository.findOne({ where: { employeeId: id } });
        return entity ? entity : null;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Employee[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        const entities = await repository.find();
        return entities;
    }

    async update(id: string, employee: Partial<Employee>, repositoryOptions?: RepositoryOptions): Promise<Employee> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        await repository.update({ employeeId: id }, employee);
        const updated = await repository.findOne({ where: { employeeId: id } });
        if (!updated) throw new NotFoundException('Employee not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        await repository.delete({ employeeId: id });
    }

    async findByEmployeeNumber(
        employeeNumber: string,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Employee | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Employee)
            : this.repository;
        console.log(employeeNumber);
        const entity = await repository.findOne({ where: { employeeNumber } });
        console.log('entity', entity);
        return entity ? entity : null;
    }
}
