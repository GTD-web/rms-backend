import { Injectable, Inject } from '@nestjs/common';
import { ResourceGroupRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-group.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResourceGroup } from '@libs/entities';

@Injectable()
export class ResourceGroupService {
    constructor(
        @Inject('ResourceGroupRepositoryPort')
        private readonly resourceGroupRepository: ResourceGroupRepositoryPort,
    ) {}

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ResourceGroup[]> {
        const resourceGroups = await this.resourceGroupRepository.find(repositoryOptions);
        return resourceGroups;
    }

    async findOne(resourceGroupId: string): Promise<ResourceGroup> {
        const resourceGroup = await this.resourceGroupRepository.findOne({
            where: {
                resourceGroupId,
            },
        });
        return resourceGroup;
    }
}
