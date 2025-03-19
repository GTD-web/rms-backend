import { VehicleInfoService } from '../services/vehicle-info.service';
import { MaintenanceResponseDto, VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateMaintenanceDto, UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationUsecase } from '@resource/modules/notification/application/usecases/notification.usecase';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { MaintenanceService } from '../services/maintenance.service';
import { Maintenance } from '@libs/entities';
import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
@Injectable()
export class MaintenanceUsecase {
    constructor(private readonly maintenanceService: MaintenanceService) {}

    async save(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
        return this.maintenanceService.save(createMaintenanceDto);
    }

    async findAll(consumableId: string): Promise<Maintenance[]> {
        return this.maintenanceService.findAll({ where: { consumableId } });
    }

    async findOne(maintenanceId: string): Promise<Maintenance> {
        return this.maintenanceService.findOne({ where: { maintenanceId } });
    }

    async update(
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Maintenance> {
        return this.maintenanceService.update(maintenanceId, updateMaintenanceDto, repositoryOptions);
    }

    async delete(maintenanceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return await this.maintenanceService.delete(maintenanceId, repositoryOptions);
    }
}
1;
