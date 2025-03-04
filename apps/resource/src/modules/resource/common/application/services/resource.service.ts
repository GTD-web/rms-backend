import {
    Injectable,
    Inject,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { IsNull, Not, DataSource } from 'typeorm';

import { Role } from '@libs/enums/role-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { CreateResourceRequestDto } from '@resource/modules/resource/common/application/dtos/create-resource-request.dto';
import { UpdateResourceRequestDto } from '@resource/modules/resource/common/application/dtos/update-resource-request.dto';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { ResourceGroupService } from '@resource/modules/resource/common/application/services/resource-group.service';
import { ResourceManagerService } from '@resource/modules/resource/common/application/services/resource-manager.service';
import { ResourceRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource.repository.port';
import { ResourceGroupRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-group.repository.port';
import { ResourceManagerRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-manager.repository.port';
import { ResourceTypeHandler } from '@resource/modules/resource/common/domain/ports/resource-type.handler.port';
import { Resource } from '@libs/entities';

@Injectable()
export class ResourceService {
    constructor(
        @Inject('ResourceTypeHandlers')
        private readonly typeHandlers: Map<ResourceType, ResourceTypeHandler>,
        @Inject('ResourceRepositoryPort')
        private readonly resourceRepository: ResourceRepositoryPort,
        @Inject('ResourceGroupRepositoryPort')
        private readonly resourceGroupRepository: ResourceGroupRepositoryPort,
        @Inject('ResourceManagerRepositoryPort')
        private readonly resourceManagerRepository: ResourceManagerRepositoryPort,
        private readonly userService: UserService,
        private readonly dataSource: DataSource,
    ) {}

    async save(resource: Resource, repositoryOptions?: RepositoryOptions): Promise<Resource> {
        const savedResource = await this.resourceRepository.save(resource, repositoryOptions);
        return savedResource;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Resource> {
        const resource = await this.resourceRepository.findOne(repositoryOptions);
        return resource;
    }

    async findAll(): Promise<Resource[]> {
        const resources = await this.resourceRepository.find();
        return resources;
    }

    async findOneByResourceId(resourceId: string): Promise<Resource> {
        const resource = await this.resourceRepository.findOne({
            where: {
                resourceId: resourceId,
            },
        });
        return resource;
    }

    async findByResourceGroupId(resourceGroupId: string): Promise<Resource[]> {
        const resources = await this.resourceRepository.find({
            where: {
                resourceGroupId: resourceGroupId,
            },
        });
        return resources;
    }

    async update(
        resourceId: string,
        resource: Partial<Resource>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Resource> {
        const updatedResource = await this.resourceRepository.update(resourceId, resource, repositoryOptions);
        return updatedResource;
    }

    // async findResourcesByTypeWithReservation(type: string): Promise<any> {
    //     const data = await this.resourceGroupRepository.findAll({
    //         where: {
    //             type: type,
    //             parentResourceGroupId: Not(IsNull()),
    //         },
    //         relations: ['resources', 'resources.reservations'],
    //     });
    //     console.log(data);

    //     return data;
    // }
}
