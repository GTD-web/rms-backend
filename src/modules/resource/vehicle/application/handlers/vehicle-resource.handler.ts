import { Inject, Injectable } from '@nestjs/common';
import { ResourceTypeHandler } from '@resource/modules/resource/common/domain/ports/resource-type.handler.port';
import { VehicleInfoService } from '@resource/modules/resource/vehicle/application/services/vehicle-info.service';
import { CreateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { VehicleInfoRepositoryPort } from '../../domain/ports/vehicle-info.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { VehicleInfo } from '@libs/entities';
import { Resource } from '@libs/entities';

@Injectable()
export class VehicleResourceHandler implements ResourceTypeHandler {
    constructor(
        @Inject('VehicleInfoRepositoryPort')
        private readonly vehicleInfoRepository: VehicleInfoRepositoryPort,
    ) {}

    async createTypeInfo(
        resource: Resource,
        typeInfo: CreateVehicleInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        await this.vehicleInfoRepository.save(
            {
                resourceId: resource.resourceId,
                ...typeInfo,
            } as VehicleInfo,
            repositoryOptions,
        );
    }
}
