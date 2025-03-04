import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance as MaintenanceEntity } from '@libs/entities';
import { Maintenance } from '@libs/entities';
import { MaintenanceRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/maintenance.repository.port';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-maintenance.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class MaintenanceRepository implements MaintenanceRepositoryPort {
    constructor(
        @InjectRepository(MaintenanceEntity)
        private readonly repository: Repository<MaintenanceEntity>,
    ) {}

    async save(maintenance: Maintenance, repositoryOptions?: RepositoryOptions): Promise<Maintenance> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        const savedEntity = await repository.save(maintenance);
        return savedEntity;
    }

    async findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Maintenance | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        const entity = await repository.findOne({ where: { maintenanceId: id } });
        return entity ? entity : null;
    }

    async findByConsumableId(consumableId: string, repositoryOptions?: RepositoryOptions): Promise<Maintenance[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        const entities = await repository.find({ where: { consumableId } });
        return entities;
    }

    async update(
        id: string,
        maintenance: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        await repository.update({ maintenanceId: id }, maintenance);
        const updated = await this.findById(id, repositoryOptions);
        if (!updated) throw new NotFoundException('Maintenance not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        await repository.delete({ maintenanceId: id });
    }
}
