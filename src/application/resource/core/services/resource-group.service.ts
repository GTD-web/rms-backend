import { Injectable } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { CreateResourceGroupDto } from '@src/application/resource/core/dtos/create-resource.dto';
import {
    ResourceGroupResponseDto,
    ResourceGroupWithResourcesResponseDto,
} from '@src/application/resource/core/dtos/resource-response.dto';
import {
    UpdateResourceGroupDto,
    UpdateResourceGroupOrdersDto,
} from '@src/application/resource/core/dtos/update-resource.dto';
import {
    FindParentResourceGroupsUsecase,
    FindResourceGroupsWithResourceDataUsecase,
    CreateResourceGroupUsecase,
    UpdateResourceGroupUsecase,
    ReorderResourceGroupsUsecase,
    DeleteResourceGroupUsecase,
} from '../usecases/resource-group';

@Injectable()
export class ResourceGroupService {
    constructor(
        private readonly findParentResourceGroupsUsecase: FindParentResourceGroupsUsecase,
        private readonly findResourceGroupsWithResourceDataUsecase: FindResourceGroupsWithResourceDataUsecase,
        private readonly createResourceGroupUsecase: CreateResourceGroupUsecase,
        private readonly updateResourceGroupUsecase: UpdateResourceGroupUsecase,
        private readonly reorderResourceGroupsUsecase: ReorderResourceGroupsUsecase,
        private readonly deleteResourceGroupUsecase: DeleteResourceGroupUsecase,
    ) {}

    // Admin Resource Group Controller
    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        return this.findParentResourceGroupsUsecase.execute();
    }

    async findResourceGroupsWithResourceData(type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]> {
        return this.findResourceGroupsWithResourceDataUsecase.execute(type);
    }

    async createResourceGroup(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroupResponseDto> {
        return this.createResourceGroupUsecase.execute(createResourceGroupDto);
    }

    async reorderResourceGroups(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<void> {
        return this.reorderResourceGroupsUsecase.execute(updateResourceGroupOrdersDto);
    }

    async updateResourceGroup(
        resourceGroupId: string,
        updateResourceGroupDto: UpdateResourceGroupDto,
    ): Promise<ResourceGroupResponseDto> {
        return this.updateResourceGroupUsecase.execute(resourceGroupId, updateResourceGroupDto);
    }

    async deleteResourceGroup(resourceGroupId: string): Promise<void> {
        return this.deleteResourceGroupUsecase.execute(resourceGroupId);
    }

    // User Resource Group Controller
    async findParentResourceGroupsForUser(): Promise<ResourceGroupResponseDto[]> {
        return this.findParentResourceGroupsUsecase.execute();
    }

    async findResourceGroupsWithResourceDataForUser(
        type: ResourceType,
    ): Promise<ResourceGroupWithResourcesResponseDto[]> {
        return this.findResourceGroupsWithResourceDataUsecase.execute(type);
    }
}
