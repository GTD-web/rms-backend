import { Injectable } from '@nestjs/common';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '../dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { SaveMaintenanceUsecase } from '../usecases/maintenance/saveMaintenance.usecase';
import { UpdateMaintenanceUsecase } from '../usecases/maintenance/updateMaintenance.usecase';
import { DeleteMaintenanceUsecase } from '../usecases/maintenance/deleteMaintenance.usecase';
import { FindAllMaintenancesByVehicleInfoIdUsecase } from '../usecases/maintenance/findAllMaintenancesByVehicleInfoId.usecase';
import { FindOneMaintenanceUsecase } from '../usecases/maintenance/findOneMaintenance.usecase';

@Injectable()
export class MaintenanceService {
    constructor(
        private readonly saveMaintenanceUsecase: SaveMaintenanceUsecase,
        private readonly updateMaintenanceUsecase: UpdateMaintenanceUsecase,
        private readonly deleteMaintenanceUsecase: DeleteMaintenanceUsecase,
        private readonly findAllMaintenancesByVehicleInfoIdUsecase: FindAllMaintenancesByVehicleInfoIdUsecase,
        private readonly findOneMaintenanceUsecase: FindOneMaintenanceUsecase,
    ) {}

    async save(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto> {
        return this.saveMaintenanceUsecase.execute(user, createMaintenanceDto);
    }

    async findAllByVehicleInfoId(
        user: Employee,
        vehicleInfoId: string,
        page: number,
        limit: number,
    ): Promise<PaginationData<MaintenanceResponseDto>> {
        return this.findAllMaintenancesByVehicleInfoIdUsecase.execute(user, vehicleInfoId, page, limit);
    }

    async findOne(user: Employee, maintenanceId: string): Promise<MaintenanceResponseDto> {
        return this.findOneMaintenanceUsecase.execute(user, maintenanceId);
    }

    async update(
        user: Employee,
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
    ): Promise<MaintenanceResponseDto> {
        return this.updateMaintenanceUsecase.execute(user, maintenanceId, updateMaintenanceDto);
    }

    async delete(user: Employee, maintenanceId: string): Promise<void> {
        return this.deleteMaintenanceUsecase.execute(user, maintenanceId);
    }
}
