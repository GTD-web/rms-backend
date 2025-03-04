import { VehicleInfo } from '@libs/entities';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface VehicleInfoRepositoryPort {
    save(vehicleInfo: VehicleInfo, repositoryOptions?: RepositoryOptions): Promise<VehicleInfo>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<VehicleInfo | null>;
    update(
        vehicleInfoId: string,
        vehicleInfo: Partial<UpdateVehicleInfoDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfo>;
    // delete(vehicleInfoId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
