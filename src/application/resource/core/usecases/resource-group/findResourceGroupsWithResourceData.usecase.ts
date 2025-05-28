import { Injectable } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class FindResourceGroupsWithResourceDataUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly resourceGroupService: DomainResourceGroupService,
    ) {}

    async execute(type?: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
                ...(type && { type }),
            },
            relations: ['children'],
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsResponse = await Promise.all(
            resourceGroups.map(async (resourceGroup) => ({
                resourceGroupId: resourceGroup.resourceGroupId,
                ...resourceGroup,
                children: await Promise.all(
                    resourceGroup.children.map(async (child) => ({
                        resourceGroupId: child.resourceGroupId,
                        ...child,
                        resources: (
                            await this.resourceService.findAll({
                                where: {
                                    resourceGroupId: child.resourceGroupId,
                                },
                                order: {
                                    order: 'ASC',
                                },
                            })
                        ).map((resource) => ({
                            resourceId: resource.resourceId,
                            name: resource.name,
                            images: resource.images,
                            isAvailable: resource.isAvailable,
                            unavailableReason: resource.unavailableReason,
                            resourceGroupId: child.resourceGroupId,
                            order: resource.order,
                        })),
                    })),
                ),
            })),
        );
        return resourceGroupsResponse;
    }
}
