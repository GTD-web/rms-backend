import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleInfo } from '@libs/entities';
import { VehicleInfoRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/vehicle-info.repository.port';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class VehicleInfoRepository implements VehicleInfoRepositoryPort {
    constructor(
        @InjectRepository(VehicleInfo)
        private readonly repository: Repository<VehicleInfo>,
    ) {}

    async save(vehicleInfo: VehicleInfo, repositoryOptions?: RepositoryOptions): Promise<VehicleInfo> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(VehicleInfo)
            : this.repository;
        const savedEntity = await repository.save(vehicleInfo);
        return savedEntity;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<VehicleInfo | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(VehicleInfo)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
        return entity ? entity : null;
    }

    async update(
        id: string,
        vehicleInfo: UpdateVehicleInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfo> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(VehicleInfo)
            : this.repository;
        await repository.update({ vehicleInfoId: id }, vehicleInfo);
        const updated = await this.findOne({ where: { vehicleInfoId: id } });
        if (!updated) throw new NotFoundException('Vehicle info not found');
        return updated;
    }
}
