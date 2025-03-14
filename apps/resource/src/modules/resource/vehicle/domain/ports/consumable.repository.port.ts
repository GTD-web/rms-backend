import { Consumable } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateConsumableDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';

export interface ConsumableRepositoryPort {
    save(createConsumableDto: CreateConsumableDto, repositoryOptions?: RepositoryOptions): Promise<Consumable>;
    findAll(repositoryOptions?: RepositoryOptions): Promise<Consumable[]>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<Consumable | null>;
    update(
        id: string,
        updateData: Partial<CreateConsumableDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Consumable>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
