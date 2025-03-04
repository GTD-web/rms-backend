import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumable as ConsumableEntity } from '@libs/entities';
import { Consumable } from '@libs/entities';
import { ConsumableRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/consumable.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ConsumableRepository implements ConsumableRepositoryPort {
    constructor(
        @InjectRepository(ConsumableEntity)
        private readonly repository: Repository<ConsumableEntity>,
    ) {}

    async save(consumable: Consumable, repositoryOptions?: RepositoryOptions): Promise<Consumable> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const savedEntity = await repository.save(consumable);
        return savedEntity;
    }

    async findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Consumable | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const entity = await repository.findOne({ where: { consumableId: id } });
        return entity ? entity : null;
    }

    async findByVehicleId(vehicleId: string, repositoryOptions?: RepositoryOptions): Promise<Consumable[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        const entities = await repository.find({ where: { vehicleId } });
        return entities;
    }

    async update(
        id: string,
        consumable: Partial<Consumable>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        await repository.update({ consumableId: id }, consumable);
        const updated = await this.findById(id, repositoryOptions);
        if (!updated) throw new NotFoundException('Consumable not found');
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ConsumableEntity)
            : this.repository;
        await repository.delete({ consumableId: id });
    }
}
