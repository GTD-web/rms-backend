import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';

@Injectable()
export class FindAllMaintenancesUsecase {
    constructor(private readonly maintenanceService: DomainMaintenanceService) {}

    async execute(user: Employee, consumableId: string) {
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }
}
