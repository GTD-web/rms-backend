import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { VehicleInfoRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/vehicle-info.repository.port';
import { VehicleInfo } from '@libs/entities';
import { CreateVehicleInfoDto } from '../dtos/create-vehicle-info.dto';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { User } from '@libs/entities';
import { Role } from '@libs/enums/role-type.enum';

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
        vehicleInfoId: string,
        updateData: UpdateVehicleInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.update(vehicleInfoId, updateData, repositoryOptions);
    }

    async checkRole(vehicleInfoId: string, user: User): Promise<boolean> {
        return true;
        // if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        // const vehicleInfo = await this.findOne({
        //     where: { vehicleInfoId },
        //     relations: ['resource', 'resource.resourceManagers'],
        // });
        // return vehicleInfo.resource.resourceManagers.some((manager) => manager.employeeId === user.employeeId);
    }
}
