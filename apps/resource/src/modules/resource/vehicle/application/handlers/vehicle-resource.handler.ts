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
        // const vehicleInfo = new VehicleInfo({
        //     ...typeInfo,
        //     resourceId: resource.resourceId,
        // });
        // await this.vehicleInfoRepository.save(vehicleInfo, repositoryOptions);
    }

    async getTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<any> {
        // return this.vehicleInfoRepository.findByResourceId(resourceId, repositoryOptions);
    }

    async updateTypeInfo(
        resource: Resource,
        typeInfo: Partial<CreateVehicleInfoDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        // await this.vehicleInfoRepository.update(resource.resourceId, typeInfo, repositoryOptions);
    }

    async deleteTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        // await this.vehicleInfoRepository.delete(resourceId, repositoryOptions);
    }

    async validateTypeData(typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<boolean> {
        // 모든 필드가 optional이므로 추가 검증 불필요
        return true;
    }
}
