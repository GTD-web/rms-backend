import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFileResourceRepository } from './file-resource.repository';
import { BaseService } from '@libs/services/base.service';
import { FileResource } from '@libs/entities/file-resource.entity';

@Injectable()
export class DomainFileResourceService extends BaseService<FileResource> {
    constructor(private readonly fileResourceRepository: DomainFileResourceRepository) {
        super(fileResourceRepository);
    }

    async findByFileResourceId(fileResourceId: string): Promise<FileResource> {
        const fileResource = await this.fileResourceRepository.findOne({
            where: { fileResourceId },
        });
        return fileResource;
    }

    async findByResourceId(resourceId: string): Promise<FileResource[]> {
        return this.fileResourceRepository.findAll({
            where: { resourceId },
            relations: ['resource', 'file'],
        });
    }

    async findByFileId(fileId: string): Promise<FileResource[]> {
        return this.fileResourceRepository.findAll({
            where: { fileId },
            relations: ['resource', 'file'],
        });
    }
}
