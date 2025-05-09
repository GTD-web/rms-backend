import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { ResourceGroup, ResourceManager } from '@libs/entities';
import { Resource } from '@libs/entities';
import { seedData } from './seed.data';
import { ResourceType } from '@libs/enums/resource-type.enum';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectRepository(ResourceGroup)
        private readonly resourceGroupRepository: Repository<ResourceGroup>,
        @InjectRepository(Resource)
        private readonly resourceRepository: Repository<Resource>,
        @InjectRepository(ResourceManager)
        private readonly resourceManagerRepository: Repository<ResourceManager>,
    ) {}

    async onModuleInit() {
        // await this.seed();
    }

    private async seed() {
        // 기본 리소스 그룹 생성
        const defaultResourceGroup = await this.resourceGroupRepository.find();

        const categories = defaultResourceGroup.filter((group) => group.parentResourceGroupId === null);
        const groups = defaultResourceGroup.filter((group) => group.parentResourceGroupId !== null);

        if (groups.length === 0) {
            for (const group of seedData) {
                const parentGroup = categories.find((c) => c.type === group.type);
                const savedGroup = await this.resourceGroupRepository.save({
                    title: group.title,
                    type: group.type,
                    parentResourceGroupId: parentGroup.resourceGroupId,
                });
                for (const resource of group.resources) {
                    const savedResource = await this.resourceRepository.save({
                        name: resource.name,
                        location: resource.location,
                        images: resource.images,
                        type: resource.type,
                        order: resource.order,
                        resourceGroupId: savedGroup.resourceGroupId,
                    });
                    await this.resourceManagerRepository.save({
                        resourceId: savedResource.resourceId,
                        employeeId: 'bedf827a-a374-4549-9c84-90698fbd9d51',
                    });
                }
            }
        }
    }
}
