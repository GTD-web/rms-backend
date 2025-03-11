import { Injectable, Inject } from '@nestjs/common';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResourceRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource.repository.port';
import { Resource } from '@libs/entities';

@Injectable()
export class ResourceService {
    constructor(
        @Inject('ResourceRepositoryPort')
        private readonly resourceRepository: ResourceRepositoryPort,
    ) {}

    async save(resource: Resource, repositoryOptions?: RepositoryOptions): Promise<Resource> {
        const savedResource = await this.resourceRepository.save(resource, repositoryOptions);
        return savedResource;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Resource> {
        const resource = await this.resourceRepository.findOne(repositoryOptions);
        return resource;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Resource[]> {
        const resources = await this.resourceRepository.find(repositoryOptions);
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

    async delete(resourceId: string): Promise<void> {
        await this.resourceRepository.delete(resourceId);
    }

    async softDelete(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const result = await this.resourceRepository.softDelete(resourceId, repositoryOptions);
        console.log(result);
    }
}
