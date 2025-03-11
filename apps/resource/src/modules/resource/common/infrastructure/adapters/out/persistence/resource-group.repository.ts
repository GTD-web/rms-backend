import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceGroup as ResourceGroupEntity } from '@libs/entities';
import { ResourceGroupRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-group.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ResourceGroupRepository implements ResourceGroupRepositoryPort {
    constructor(
        @InjectRepository(ResourceGroupEntity)
        private readonly repository: Repository<ResourceGroupEntity>,
    ) {}

    async save(
        resourceGroup: Partial<ResourceGroupEntity>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceGroupEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceGroupEntity)
            : this.repository;
        return repository.save(resourceGroup);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceGroupEntity | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceGroupEntity)
            : this.repository;
        return repository.findOne({ where: repositoryOptions?.where, relations: repositoryOptions?.relations });
    }

    async find(repositoryOptions?: RepositoryOptions): Promise<ResourceGroupEntity[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceGroupEntity)
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
        resourceGroup: Partial<ResourceGroupEntity>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceGroupEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceGroupEntity)
            : this.repository;
        await repository.update({ resourceGroupId: id }, resourceGroup);
        const updated = await repository.findOne({ where: { resourceGroupId: id } });
        if (!updated) throw new NotFoundException('Resource group not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceGroupEntity)
            : this.repository;
        await repository.delete({ resourceGroupId: id });
    }
}
