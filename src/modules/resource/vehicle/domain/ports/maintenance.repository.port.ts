import { Maintenance } from '@libs/entities';
import { UpdateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateMaintenanceDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';

export interface MaintenanceRepositoryPort {
    save(createMaintenanceDto: CreateMaintenanceDto, repositoryOptions?: RepositoryOptions): Promise<Maintenance>;
    findAll(repositoryOptions?: RepositoryOptions): Promise<Maintenance[]>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<Maintenance | null>;
    update(
        id: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
    count(repositoryOptions?: RepositoryOptions): Promise<number>;
}
