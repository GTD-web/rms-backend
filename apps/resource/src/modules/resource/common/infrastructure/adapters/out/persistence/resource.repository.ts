import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource as ResourceEntity } from '@libs/entities';
import { ResourceRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ResourceRepository implements ResourceRepositoryPort {
    constructor(
        @InjectRepository(ResourceEntity)
        private readonly repository: Repository<ResourceEntity>,
    ) {}

    async save(resource: Partial<ResourceEntity>, repositoryOptions?: RepositoryOptions): Promise<ResourceEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceEntity)
            : this.repository;
        const savedEntity = await repository.save(resource);
        return await repository.findOne({
            where: { resourceId: savedEntity.resourceId },
            relations: ['resourceGroup'],
        });
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceEntity | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceEntity)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }

    async find(repositoryOptions?: RepositoryOptions): Promise<ResourceEntity[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceEntity)
            : this.repository;
        return await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async update(
        id: string,
        resource: Partial<ResourceEntity>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceEntity> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceEntity)
            : this.repository;
        await repository.update({ resourceId: id }, resource);
        const updated = await repository.findOne({
            where: { resourceId: id },
            relations: ['resourceGroup'],
        });
        if (!updated) throw new NotFoundException('Resource not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ResourceEntity)
            : this.repository;
        await repository.delete({ resourceId: id });
    }
}
