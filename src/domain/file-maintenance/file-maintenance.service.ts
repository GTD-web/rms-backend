import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFileMaintenanceRepository } from './file-maintenance.repository';
import { BaseService } from '@libs/services/base.service';
import { FileMaintenance } from '@libs/entities/file-maintenance.entity';

@Injectable()
export class DomainFileMaintenanceService extends BaseService<FileMaintenance> {
    constructor(private readonly fileMaintenanceRepository: DomainFileMaintenanceRepository) {
        super(fileMaintenanceRepository);
    }

    async findByFileMaintenanceId(fileMaintenanceId: string): Promise<FileMaintenance> {
        const fileMaintenance = await this.fileMaintenanceRepository.findOne({
            where: { fileMaintenanceId },
        });
        return fileMaintenance;
    }

    async findByMaintenanceId(maintenanceId: string): Promise<FileMaintenance[]> {
        return this.fileMaintenanceRepository.findAll({
            where: { maintenanceId },
            relations: ['maintenance', 'file'],
        });
    }

    async findByFileId(fileId: string): Promise<FileMaintenance[]> {
        return this.fileMaintenanceRepository.findAll({
            where: { fileId },
            relations: ['maintenance', 'file'],
        });
    }
}
