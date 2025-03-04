import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ResourceManagerRepositoryPort } from '@resource/modules/resource/common/domain/ports/resource-manager.repository.port';

@Injectable()
export class ResourceManagerService {
    constructor(
        @Inject('ResourceManagerRepositoryPort')
        private readonly resourceManagerRepository: ResourceManagerRepositoryPort,
    ) {}

    // async create(createDto: { resourceId: string; employeeId: string }, repositoryOptions?: RepositoryOptions): Promise<ResourceManager> {
    //   const resourceManager = new ResourceManager({
    //     resourceId: createDto.resourceId,
    //     employeeId: createDto.employeeId,
    //   });
    //   return this.resourceManagerRepository.save(resourceManager, repositoryOptions);
    // }

    // async findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<ResourceManager[]> {
    //   return this.resourceManagerRepository.findByResourceId(resourceId, repositoryOptions);
    // }

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
