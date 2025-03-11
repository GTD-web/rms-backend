import { Injectable, Inject } from '@nestjs/common';
import { ResourceGroupRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-group.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResourceGroup } from '@libs/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class ResourceGroupService {
    constructor(
        @Inject('ResourceGroupRepositoryPort')
        private readonly resourceGroupRepository: ResourceGroupRepositoryPort,
        private readonly dataSource: DataSource,
    ) {}

    async save(resourceGroup: ResourceGroup, repositoryOptions?: RepositoryOptions): Promise<ResourceGroup> {
        return this.resourceGroupRepository.save(resourceGroup, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ResourceGroup[]> {
        const resourceGroups = await this.resourceGroupRepository.find(repositoryOptions);
        return resourceGroups;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceGroup> {
        const resourceGroup = await this.resourceGroupRepository.findOne(repositoryOptions);
        return resourceGroup;
    }

    async update(
        resourceGroupId: string,
        resourceGroup: Partial<ResourceGroup>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceGroup> {
        return this.resourceGroupRepository.update(resourceGroupId, resourceGroup, repositoryOptions);
    }

    async delete(resourceGroupId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return this.resourceGroupRepository.delete(resourceGroupId, repositoryOptions);
    }
}
