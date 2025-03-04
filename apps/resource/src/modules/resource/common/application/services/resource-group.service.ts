import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ResourceGroupRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-group.repository.port';
import { CreateResourceGroupDto } from '@resource/modules/resource/common/application/dtos/create-resource-group.dto';
import { ResourceGroupResponseDto } from '../dtos/resource-group-response.dto';
import { UpdateResourceGroupDto } from '@resource/modules/resource/common/application/dtos/update-resource-group.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { IsNull } from 'typeorm';
import { ResourceService } from './resource.service';
import { ResourceRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource.repository.port';
import { ResourceGroup } from '@libs/entities';

@Injectable()
export class ResourceGroupService {
    constructor(
        @Inject('ResourceRepositoryPort')
        private readonly resourceRepository: ResourceRepositoryPort,
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
