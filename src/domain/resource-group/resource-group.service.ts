import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainResourceGroupRepository } from './resource-group.repository';
import { BaseService } from '@libs/services/base.service';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class DomainResourceGroupService extends BaseService<ResourceGroup> {
    constructor(private readonly resourceGroupRepository: DomainResourceGroupRepository) {
        super(resourceGroupRepository);
    }

    async findByResourceGroupId(resourceGroupId: string): Promise<ResourceGroup> {
        const resourceGroup = await this.resourceGroupRepository.findOne({
            where: { resourceGroupId },
        });
        if (!resourceGroup) {
            throw new NotFoundException('리소스 그룹을 찾을 수 없습니다.');
        }
        return resourceGroup;
    }

    async findByType(type: ResourceType): Promise<ResourceGroup[]> {
        return this.resourceGroupRepository.findAll({
            where: { type },
            relations: ['resources', 'parent', 'children'],
            order: { order: 'ASC' },
        });
    }

    async findByParentId(parentResourceGroupId: string): Promise<ResourceGroup[]> {
        return this.resourceGroupRepository.findAll({
            where: { parentResourceGroupId },
            relations: ['resources', 'children'],
            order: { order: 'ASC' },
        });
    }

    async findRootGroups(): Promise<ResourceGroup[]> {
        return this.resourceGroupRepository.findAll({
            where: { parentResourceGroupId: null },
            relations: ['resources', 'children'],
            order: { order: 'ASC' },
        });
    }
}
