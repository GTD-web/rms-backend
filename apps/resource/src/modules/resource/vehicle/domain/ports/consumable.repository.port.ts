import { Consumable } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ConsumableRepositoryPort {
    save(consumable: Consumable, repositoryOptions?: RepositoryOptions): Promise<Consumable>;
    findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Consumable | null>;
    findByVehicleId(vehicleId: string, repositoryOptions?: RepositoryOptions): Promise<Consumable[]>;
    update(id: string, consumable: Partial<Consumable>, repositoryOptions?: RepositoryOptions): Promise<Consumable>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
