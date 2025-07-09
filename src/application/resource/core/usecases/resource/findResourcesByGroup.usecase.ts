import { Injectable } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { DomainResourceService } from '@src/domain/resource/resource.service';

@Injectable()
export class FindResourcesByGroupUsecase {
    constructor(private readonly resourceService: DomainResourceService) {}

    async execute(resourceGroupId: string): Promise<ResourceResponseDto[]> {
        const resources = await this.resourceService.findAll({
            where: {
                resourceGroupId: resourceGroupId,
            },
            relations: [
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'equipmentInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        return resources.map((resource) => new ResourceResponseDto(resource));
    }
}
