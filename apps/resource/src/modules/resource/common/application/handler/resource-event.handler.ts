import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResourceService } from '@resource/modules/resource/common/application/services/resource.service';

@Injectable()
export class ResourceEventHandler {
    constructor(private readonly resourceService: ResourceService) {}

    @OnEvent('find.resource')
    async handleFindResource(payload: { repositoryOptions?: RepositoryOptions }) {
        return await this.resourceService.findAll(payload.repositoryOptions);
    }
}
