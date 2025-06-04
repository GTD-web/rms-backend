import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class FindOneMaintenanceUsecase {
    constructor(private readonly maintenanceService: DomainMaintenanceService) {}

    async execute(user: Employee, maintenanceId: string) {
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
            withDeleted: true,
        });
        const previousMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: LessThan(maintenance.createdAt) },
            order: { createdAt: 'DESC' },
        });

        maintenance.createdAt.setTime(maintenance.createdAt.getTime() + 1);
        const nextMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: MoreThan(maintenance.createdAt) },
            order: { createdAt: 'ASC' },
        });

        return {
            maintenanceId: maintenance.maintenanceId,
            consumableId: maintenance.consumableId,
            date: maintenance.date,
            mileage: maintenance.mileage,
            cost: maintenance.cost,
            images: maintenance.images,
            consumableName: maintenance.consumable.name,
            resourceName: maintenance.consumable.vehicleInfo.resource.name,
            previousMileage: previousMaintenance ? previousMaintenance.mileage : 0,
            previousDate: previousMaintenance ? previousMaintenance.date : null,
            isLatest: !nextMaintenance,
        };
    }
}
