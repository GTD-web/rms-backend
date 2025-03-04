import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/entities';
import { UserRepositoryPort } from '@resource/modules/auth/domain/ports/user.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class UserRepository implements UserRepositoryPort {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async findOne(repositoryOptions?: RepositoryOptions): Promise<User | null> {
        const repository = this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
        return entity;
    }

    async find(repositoryOptions?: RepositoryOptions): Promise<User[]> {
        const repository = this.repository;
        const entities = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
        return entities;
    }

    async save(user: Partial<User>, repositoryOptions?: RepositoryOptions): Promise<User> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(User)
            : this.repository;
        const entity = await repository.save(user);
        return entity;
    }

    async update(userId: string, userData: Partial<User>, repositoryOptions?: RepositoryOptions): Promise<User> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(User)
            : this.repository;
        await repository.update(userId, userData);
        const updated = await repository.findOne({
            where: { userId },
            relations: ['employee'],
        });
        return updated;
    }

    // async findByEmail(email: string, repositoryOptions?: RepositoryOptions): Promise<User | null> {
    //     const repository = repositoryOptions?.queryRunner
    //         ? repositoryOptions.queryRunner.manager.getRepository(User)
    //         : this.repository;
    //     const entity = await repository.findOne({
    //         where: { email },
    //     });
    //     return entity ? this.toDomain(entity) : null;
    // }

    // async findByUserId(userId: string, repositoryOptions?: RepositoryOptions): Promise<User | null> {
    //     const repository = repositoryOptions?.queryRunner
    //         ? repositoryOptions.queryRunner.manager.getRepository(UserEntity)
    //         : this.repository;
    //     const entity = await repository.findOne({
    //         where: { userId },
    //     });
    //     return entity ? this.toDomain(entity) : null;
    // }

    // async findByEmployeeId(employeeId: string, repositoryOptions?: RepositoryOptions): Promise<User | null> {
    //     const repository = repositoryOptions?.queryRunner
    //         ? repositoryOptions.queryRunner.manager.getRepository(UserEntity)
    //         : this.repository;
    //     const entity = await repository.findOne({
    //         where: { employeeId },
    //     });
    //     console.log('entity', entity);
    //     return entity ? this.toDomain(entity) : null;
    // }
}
