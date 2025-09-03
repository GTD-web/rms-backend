import { Injectable } from '@nestjs/common';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { ResourceGroupResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class FindParentResourceGroupsUsecase {
    constructor(private readonly resourceGroupService: DomainResourceGroupService) {}

    async execute(): Promise<ResourceGroupResponseDto[]> {
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                parentResourceGroupId: IsNull(),
            },
            order: {
                order: 'ASC',
            },
        });
        return resourceGroups;
    }
}
