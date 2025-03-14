import { Injectable } from '@nestjs/common';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Consumable } from '@libs/entities';
import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';

@Injectable()
export class ConsumableUsecase {
    constructor(private readonly consumableService: ConsumableService) {}

    async save(createConsumableDto: CreateConsumableDto, repositoryOptions?: RepositoryOptions): Promise<Consumable> {
        return this.consumableService.save(createConsumableDto, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Consumable[]> {
        return this.consumableService.findAll(repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Consumable | null> {
        return this.consumableService.findOne(repositoryOptions);
    }

    async update(
        id: string,
        updateData: Partial<CreateConsumableDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable> {
        return this.consumableService.update(id, updateData, repositoryOptions);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return this.consumableService.delete(id, repositoryOptions);
    }
}
