import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance as MaintenanceEntity } from '@libs/entities';
import { Maintenance } from '@libs/entities';
import { MaintenanceRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/maintenance.repository.port';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';

@Injectable()
export class MaintenanceRepository implements MaintenanceRepositoryPort {
    constructor(
        @InjectRepository(MaintenanceEntity)
        private readonly repository: Repository<MaintenanceEntity>,
    ) {}

    async save(
        createMaintenanceDto: CreateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        const savedEntity = await repository.save(createMaintenanceDto);
        return savedEntity;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Maintenance[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Maintenance | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
        });
    }

    async update(
        id: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        await repository.update({ maintenanceId: id }, updateMaintenanceDto);
        const updated = await this.findOne({ where: { maintenanceId: id }, relations: repositoryOptions?.relations });
        if (!updated) throw new NotFoundException('Maintenance not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        await repository.delete({ maintenanceId: id });
    }

    async count(repositoryOptions?: RepositoryOptions): Promise<number> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(MaintenanceEntity)
            : this.repository;
        return repository.count({ where: repositoryOptions?.where });
    }
}
