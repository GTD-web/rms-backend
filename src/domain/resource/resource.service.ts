import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainResourceRepository } from './resource.repository';
import { BaseService } from '@libs/services/base.service';
import { Resource } from '@libs/entities/resource.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ResourceType } from '@libs/enums/resource-type.enum';

@Injectable()
export class DomainResourceService extends BaseService<Resource> {
    constructor(private readonly resourceRepository: DomainResourceRepository) {
        super(resourceRepository);
    }

    async findByResourceId(resourceId: string): Promise<Resource> {
        const resource = await this.resourceRepository.findOne({
            where: { resourceId },
        });
        if (!resource) {
            throw new NotFoundException('리소스를 찾을 수 없습니다.');
        }
        return resource;
    }

    async findByResourceGroupId(resourceGroupId: string): Promise<Resource[]> {
        return this.resourceRepository.findAll({
            where: { resourceGroupId },
            relations: ['resourceGroup', 'vehicleInfo', 'meetingRoomInfo', 'accommodationInfo'],
            order: { order: 'ASC' },
        });
    }

    async findByType(type: ResourceType): Promise<Resource[]> {
        return this.resourceRepository.findAll({
            where: { type },
            relations: ['resourceGroup', 'vehicleInfo', 'meetingRoomInfo', 'accommodationInfo'],
            order: { order: 'ASC' },
        });
    }

    async findAvailable(): Promise<Resource[]> {
        return this.resourceRepository.findAll({
            where: { isAvailable: true },
            relations: ['resourceGroup', 'vehicleInfo', 'meetingRoomInfo', 'accommodationInfo'],
            order: { order: 'ASC' },
        });
    }

    async findByName(name: string): Promise<Resource> {
        const resource = await this.resourceRepository.findOne({
            where: { name },
        });
        if (!resource) {
            throw new NotFoundException('리소스를 찾을 수 없습니다.');
        }
        return resource;
    }
}
