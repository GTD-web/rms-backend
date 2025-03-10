import { Injectable } from '@nestjs/common';
import { ResourceService } from '../services/resource.service';
import { ResourceGroupService } from '../services/resource-group.service';
import { IsNull, Not } from 'typeorm';
import { ReservationService } from '@resource/modules/reservation/application/services/reservation.service';
import { ResourceGroupResponseDto } from '../dtos/resource-response.dto';
@Injectable()
export class ResourceGroupUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly resourceGroupService: ResourceGroupService,
        private readonly reservationService: ReservationService,
    ) {}

    async findParentResourceGroups(): Promise<ResourceGroupResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
            },
        });
        return resourceGroups;
    }

    async findResourceGroupsWithResourceData(): Promise<ResourceGroupResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
            },
            relations: ['children'],
        });
        const resourceGroupsResponse = await Promise.all(
            resourceGroups.map(async (resourceGroup) => ({
                resourceGroupId: resourceGroup.resourceGroupId,
                ...resourceGroup,
                children: await Promise.all(
                    resourceGroup.children.map(async (child) => ({
                        resourceGroupId: child.resourceGroupId,
                        ...child,
                        resources: (await this.resourceService.findByResourceGroupId(child.resourceGroupId)).map(
                            (resource) => ({
                                resourceId: resource.resourceId,
                                name: resource.name,
                                isAvailable: resource.isAvailable,
                                unavailableReason: resource.unavailableReason,
                                resourceGroupId: child.resourceGroupId,
                            }),
                        ),
                    })),
                ),
            })),
        );
        return resourceGroupsResponse;
    }
}
