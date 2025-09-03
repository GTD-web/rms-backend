import { Injectable } from '@nestjs/common';
import { Employee, Maintenance } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { In } from 'typeorm';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';

@Injectable()
export class FindAllMaintenancesByVehicleInfoIdUsecase {
    constructor(
        private readonly maintenanceService: DomainMaintenanceService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
    ) {}

    async execute(user: Employee, vehicleInfoId: string, page: number, limit: number) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
            withDeleted: true,
        });
        const options: IRepositoryOptions<Maintenance> = {
            where: {
                maintenanceId: In(
                    vehicleInfo.consumables.flatMap((consumable) =>
                        consumable.maintenances.map((maintenance) => maintenance.maintenanceId),
                    ),
                ),
            },
            withDeleted: true,
        };
        const count = await this.maintenanceService.count(options);

        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        options.relations = ['consumable'];
        options.order = { createdAt: 'DESC' };
        const maintenances = await this.maintenanceService.findAll(options);

        return {
            items: maintenances.map((maintenance, index, array) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
                consumableName: maintenance.consumable.name,
                resourceName: vehicleInfo.resource.name,
                previousMileage: index !== array.length - 1 ? array[index + 1].mileage : 0,
                isLatest: index === 0,
            })),

            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }
}
