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

    async softDelete(resourceId: string, options?: IRepositoryOptions<Resource>): Promise<void> {
        await this.resourceRepository.softDelete(resourceId, options);
    }
}
