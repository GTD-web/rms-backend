import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainResourceManagerRepository } from './resource-manager.repository';
import { BaseService } from '@libs/services/base.service';
import { ResourceManager } from '@libs/entities/resource-manager.entity';

@Injectable()
export class DomainResourceManagerService extends BaseService<ResourceManager> {
    constructor(private readonly resourceManagerRepository: DomainResourceManagerRepository) {
        super(resourceManagerRepository);
    }

    async findByResourceManagerId(resourceManagerId: string): Promise<ResourceManager> {
        const resourceManager = await this.resourceManagerRepository.findOne({
            where: { resourceManagerId },
        });
        if (!resourceManager) {
            throw new NotFoundException('리소스 관리자를 찾을 수 없습니다.');
        }
        return resourceManager;
    }

    async findByEmployeeId(employeeId: string): Promise<ResourceManager[]> {
        return this.resourceManagerRepository.findAll({
            where: { employeeId },
            relations: ['employee', 'resource'],
        });
    }

    async findByResourceId(resourceId: string): Promise<ResourceManager[]> {
        return this.resourceManagerRepository.findAll({
            where: { resourceId },
            relations: ['employee', 'resource'],
        });
    }
}
