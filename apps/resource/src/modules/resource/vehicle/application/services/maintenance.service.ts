import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MaintenanceRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/maintenance.repository.port';
import { Maintenance } from '@libs/entities';
import { CreateMaintenanceDto } from '../dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dtos/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
    constructor(
        @Inject('MaintenanceRepositoryPort')
        private readonly maintenanceRepository: MaintenanceRepositoryPort,
    ) {}

    // async create(createDto: CreateMaintenanceDto & { consumableId: string }) {
    //   const maintenance = new Maintenance({
    //     consumableId: createDto.consumableId,
    //     date: createDto.date,
    //     mileage: createDto.mileage,
    //     cost: createDto.cost,
    //     images: createDto.images,
    //   });
    //   return this.maintenanceRepository.save(maintenance);
    // }

    // async findById(id: string) {
    //   const maintenance = await this.maintenanceRepository.findById(id);
    //   if (!maintenance) {
    //     throw new NotFoundException('Maintenance not found');
    //   }
    //   return maintenance;
    // }

    // async findByConsumableId(consumableId: string) {
    //   return this.maintenanceRepository.findByConsumableId(consumableId);
    // }

    // async update(id: string, updateData: UpdateMaintenanceDto) {
    //   const maintenance = await this.findById(id);
    //   return this.maintenanceRepository.update(id, {
    //     ...maintenance,
    //     ...updateData,
    //   });
    // }

    // async remove(id: string) {
    //   await this.maintenanceRepository.delete(id);
    // }
}
