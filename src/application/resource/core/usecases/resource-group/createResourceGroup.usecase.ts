import { Injectable } from '@nestjs/common';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { CreateResourceGroupDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { ResourceGroup } from '@libs/entities/resource-group.entity';

@Injectable()
export class CreateResourceGroupUsecase {
    constructor(private readonly resourceGroupService: DomainResourceGroupService) {}

    async execute(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroup> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: createResourceGroupDto.parentResourceGroupId,
            },
        });
        const resourceGroupOrder = resourceGroups.length;

        const resourceGroup = await this.resourceGroupService.save({
            ...createResourceGroupDto,
            order: resourceGroupOrder,
        });

        return resourceGroup;
    }
}
