import { Inject, Injectable } from '@nestjs/common';
import { ResourceTypeHandler } from '@resource/modules/resource/common/domain/ports/resource-type.handler.port';
import { Resource } from '@libs/entities';
import { AccommodationInfoService } from '@resource/modules/resource/accommodation/application/services/accommodation-info.service';
import { CreateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/create-accommodation-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { AccommodationInfoRepositoryPort } from '../../domain/ports/accommodation-info.repository.port';
import { AccommodationInfo } from '../../domain/models/accommodation-info';

@Injectable()
export class AccommodationResourceHandler implements ResourceTypeHandler {
    constructor(
        @Inject('AccommodationInfoRepositoryPort')
        private readonly accommodationInfoRepository: AccommodationInfoRepositoryPort,
    ) {}

    async createTypeInfo(
        resource: Resource,
        typeInfo: CreateAccommodationInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        const accommodationInfo = new AccommodationInfo({
            ...typeInfo,
            resourceId: resource.resourceId,
        });
        await this.accommodationInfoRepository.save(accommodationInfo, repositoryOptions);
    }

    async getTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<any> {
        return this.accommodationInfoRepository.findByResourceId(resourceId, repositoryOptions);
    }

    async updateTypeInfo(
        resource: Resource,
        typeInfo: Partial<CreateAccommodationInfoDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        await this.accommodationInfoRepository.update(resource.resourceId, typeInfo, repositoryOptions);
    }

    async deleteTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        await this.accommodationInfoRepository.delete(resourceId, repositoryOptions);
    }

    async validateTypeData(typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<boolean> {
        return true;
    }
}
