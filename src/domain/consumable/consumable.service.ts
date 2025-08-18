import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainConsumableRepository } from './consumable.repository';
import { BaseService } from '@libs/services/base.service';
import { Consumable } from '@libs/entities/consumable.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class DomainConsumableService extends BaseService<Consumable> {
    constructor(private readonly consumableRepository: DomainConsumableRepository) {
        super(consumableRepository);
    }

    async findByConsumableId(consumableId: string): Promise<Consumable> {
        const consumable = await this.consumableRepository.findOne({
            where: { consumableId },
        });
        if (!consumable) {
            throw new NotFoundException('소모품을 찾을 수 없습니다.');
        }
        return consumable;
    }

    async findByVehicleInfoId(vehicleInfoId: string): Promise<Consumable[]> {
        return this.consumableRepository.findAll({
            where: { vehicleInfoId },
            relations: ['vehicleInfo', 'maintenances'],
        });
    }

    async findNeedReplacement(): Promise<Consumable[]> {
        return this.consumableRepository.findAll({
            where: { notifyReplacementCycle: true },
            relations: ['vehicleInfo'],
        });
    }

    async bulkCreate(consumables: Consumable[], repositoryOptions?: IRepositoryOptions<Consumable>) {
        return this.consumableRepository.bulkCreate(consumables, repositoryOptions);
    }
}
