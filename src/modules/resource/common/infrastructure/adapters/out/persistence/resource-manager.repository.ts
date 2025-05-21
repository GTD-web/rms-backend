import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceManager as ResourceManagerEntity } from '@libs/entities';
import { ResourceManagerRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-manager.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ResourceManagerRepository implements ResourceManagerRepositoryPort {
    constructor(
        @InjectRepository(ResourceManagerEntity)
        private readonly repository: Repository<ResourceManagerEntity>,
    ) {}

    async save(
        resourceManager: Partial<ResourceManagerEntity>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceManagerEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceManagerEntity)
            : this.repository;
        return repository.save(resourceManager);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceManagerEntity | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceManagerEntity)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }

    async find(repositoryOptions?: RepositoryOptions): Promise<ResourceManagerEntity[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceManagerEntity)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async update(
        id: string,
        resourceManager: Partial<ResourceManagerEntity>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceManagerEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceManagerEntity)
            : this.repository;
        await repository.update({ resourceManagerId: id }, resourceManager);
        const updated = await repository.findOne({ where: { resourceManagerId: id } });
        if (!updated) throw new NotFoundException('Resource manager not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceManagerEntity)
            : this.repository;
        await repository.delete({ resourceManagerId: id });
    }
}
