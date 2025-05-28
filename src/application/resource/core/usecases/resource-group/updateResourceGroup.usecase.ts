import { Injectable } from '@nestjs/common';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { UpdateResourceGroupDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceGroup } from '@libs/entities/resource-group.entity';

@Injectable()
export class UpdateResourceGroupUsecase {
    constructor(private readonly resourceGroupService: DomainResourceGroupService) {}

    async execute(resourceGroupId: string, updateResourceGroupDto: UpdateResourceGroupDto): Promise<ResourceGroup> {
        const resourceGroup = await this.resourceGroupService.update(resourceGroupId, updateResourceGroupDto);
        return resourceGroup;
    }
}
