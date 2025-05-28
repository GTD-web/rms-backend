import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@resource/domain/maintenance/maintenance.service';

@Injectable()
export class DeleteMaintenanceUsecase {
    constructor(private readonly maintenanceService: DomainMaintenanceService) {}

    async execute(user: Employee, maintenanceId: string): Promise<void> {
        return this.maintenanceService.delete(maintenanceId);
    }
}
