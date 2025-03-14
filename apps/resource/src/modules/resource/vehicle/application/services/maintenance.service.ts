import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MaintenanceRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/maintenance.repository.port';
import { Maintenance } from '@libs/entities';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class MaintenanceService {
    constructor(
        @Inject('MaintenanceRepositoryPort')
        private readonly maintenanceRepository: MaintenanceRepositoryPort,
    ) {}

    async save(
        createMaintenanceDto: CreateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        return this.maintenanceRepository.save(createMaintenanceDto, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Maintenance[]> {
        return this.maintenanceRepository.findAll(repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Maintenance | null> {
        return this.maintenanceRepository.findOne(repositoryOptions);
    }

    async update(
        id: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        return this.maintenanceRepository.update(id, updateMaintenanceDto, repositoryOptions);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return this.maintenanceRepository.delete(id, repositoryOptions);
    }
}
