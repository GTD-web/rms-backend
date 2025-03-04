import { Maintenance } from '@libs/entities';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-maintenance.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface MaintenanceRepositoryPort {
    save(maintenance: Maintenance, repositoryOptions?: RepositoryOptions): Promise<Maintenance>;
    findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Maintenance | null>;
    findByConsumableId(consumableId: string, repositoryOptions?: RepositoryOptions): Promise<Maintenance[]>;
    update(id: string, maintenance: UpdateMaintenanceDto, repositoryOptions?: RepositoryOptions): Promise<Maintenance>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
