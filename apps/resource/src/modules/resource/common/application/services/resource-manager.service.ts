import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ResourceManagerRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-manager.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResourceManager } from '@libs/entities/resource-manager.entity';

@Injectable()
export class ResourceManagerService {
    constructor(
        @Inject('ResourceManagerRepositoryPort')
        private readonly resourceManagerRepository: ResourceManagerRepositoryPort,
    ) {}

    async save(
        resourceManager: Partial<ResourceManager>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceManager> {
        return this.resourceManagerRepository.save(resourceManager, repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceManager> {
        return this.resourceManagerRepository.findOne(repositoryOptions);
    }

    // async updateManagers(resourceId: string, newManagerIds: string[], repositoryOptions?: RepositoryOptions): Promise<void> {
    //   const currentManagers = await this.findByResourceId(resourceId, repositoryOptions);
    //   const currentManagerIds = currentManagers.map(m => m.employeeId);

    //   // 삭제될 관리자 처리
    //   const managersToRemove = currentManagers.filter(
    //     manager => !newManagerIds.includes(manager.employeeId)
    //   );
    //   await Promise.all(
    //     managersToRemove.map(manager =>
    //       this.resourceManagerRepository.delete(manager.resourceManagerId, repositoryOptions)
    //     )
    //   );

    //   // 새로 추가될 관리자 처리
    //   const managersToAdd = newManagerIds.filter(
    //     employeeId => !currentManagerIds.includes(employeeId)
    //   );
    //   await Promise.all(
    //     managersToAdd.map(employeeId =>
    //       this.create({ resourceId, employeeId }, repositoryOptions)
    //     )
    //   );
    // }

    // async remove(resourceManagerId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
    //   await this.resourceManagerRepository.delete(resourceManagerId, repositoryOptions);
    // }
}
