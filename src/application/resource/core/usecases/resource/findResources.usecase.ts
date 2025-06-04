import { Injectable } from '@nestjs/common';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { DomainResourceService } from '@src/domain/resource/resource.service';

@Injectable()
export class FindResourcesUsecase {
    constructor(private readonly resourceService: DomainResourceService) {}

    async execute(type: ResourceType): Promise<ResourceResponseDto[]> {
        let relations: string[] = [];
        if (type === ResourceType.VEHICLE) {
            relations = ['vehicleInfo', 'vehicleInfo.consumables'];
        } else if (type === ResourceType.MEETING_ROOM) {
            relations = ['meetingRoomInfo'];
        } else if (type === ResourceType.ACCOMMODATION) {
            relations = ['accommodationInfo'];
        } else if (type === ResourceType.TESTER) {
            relations = ['testerInfo'];
        }
        const resources = await this.resourceService.findAll({
            where: {
                type: type,
            },
            relations: relations,
        });
        return resources.map((resource) => new ResourceResponseDto(resource));
    }
}
