import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainMaintenanceRepository } from './maintenance.repository';
import { BaseService } from '@libs/services/base.service';
import { Maintenance } from '@libs/entities/maintenance.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { Between } from 'typeorm';

@Injectable()
export class DomainMaintenanceService extends BaseService<Maintenance> {
    constructor(private readonly maintenanceRepository: DomainMaintenanceRepository) {
        super(maintenanceRepository);
    }

    async findByMaintenanceId(maintenanceId: string): Promise<Maintenance> {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { maintenanceId },
        });
        if (!maintenance) {
            throw new NotFoundException('정비 정보를 찾을 수 없습니다.');
        }
        return maintenance;
    }

    async findByConsumableId(consumableId: string): Promise<Maintenance[]> {
        return this.maintenanceRepository.findAll({
            where: { consumableId },
            relations: ['consumable'],
            order: { date: 'DESC' },
        });
    }

    async findByDateRange(startDate: string, endDate: string): Promise<Maintenance[]> {
        return this.maintenanceRepository.findAll({
            where: {
                date: Between(startDate, endDate),
            },
            relations: ['consumable'],
            order: { date: 'DESC' },
        });
    }
}
