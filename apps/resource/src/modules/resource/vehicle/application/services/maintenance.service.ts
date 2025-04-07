import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MaintenanceRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/maintenance.repository.port';
import { Maintenance, User } from '@libs/entities';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Role } from '@libs/enums/role-type.enum';
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
        return await this.maintenanceRepository.findAll(repositoryOptions);
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

    async count(repositoryOptions?: RepositoryOptions): Promise<number> {
        return this.maintenanceRepository.count(repositoryOptions);
    }

    async checkRole(maintenanceId: string, user: User): Promise<boolean> {
        if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        const maintenance = await this.findOne({
            where: { maintenanceId },
            relations: [
                'consumable',
                'consumable.vehicleInfo',
                'consumable.vehicleInfo.resource',
                'consumable.vehicleInfo.resource.resourceManagers',
            ],
        });
        return maintenance.consumable.vehicleInfo.resource.resourceManagers.some(
            (manager) => manager.employeeId === user.employeeId,
        );
    }
}
