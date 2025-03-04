import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { VehicleInfoRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/vehicle-info.repository.port';
import { VehicleInfo } from '@libs/entities';
import { CreateVehicleInfoDto } from '../dtos/create-vehicle-info.dto';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class VehicleInfoService {
    constructor(
        @Inject('VehicleInfoRepositoryPort')
        private readonly vehicleInfoRepository: VehicleInfoRepositoryPort,
    ) {}

    async save(vehicleInfo: VehicleInfo, repositoryOptions?: RepositoryOptions): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.save(vehicleInfo, repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.findOne(repositoryOptions);
    }

    async update(
        vehicleId: string,
        updateData: UpdateVehicleInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.update(vehicleId, updateData, repositoryOptions);
    }
}
