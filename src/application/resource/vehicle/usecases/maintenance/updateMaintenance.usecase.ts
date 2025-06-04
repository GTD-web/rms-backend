import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, MoreThan, Not } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { UpdateMaintenanceDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';

@Injectable()
export class UpdateMaintenanceUsecase {
    constructor(
        private readonly maintenanceService: DomainMaintenanceService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly dataSource: DataSource,
        private readonly fileService: DomainFileService,
    ) {}

    async execute(
        user: Employee,
        maintenanceId: string,
        updateMaintenanceDto: UpdateMaintenanceDto,
    ): Promise<Maintenance> {
        if (updateMaintenanceDto.date) {
            const existingMaintenance = await this.maintenanceService.findOne({
                where: {
                    maintenanceId: Not(maintenanceId),
                    consumableId: updateMaintenanceDto.consumableId,
                    date: MoreThan(updateMaintenanceDto.date),
                },
            });
            if (existingMaintenance) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
            }
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const maintenance = await this.maintenanceService.update(maintenanceId, updateMaintenanceDto);
            if (updateMaintenanceDto.images && updateMaintenanceDto.images.length > 0) {
                await this.fileService.updateTemporaryFiles(updateMaintenanceDto.images, false, { queryRunner });
            }
            if (updateMaintenanceDto.mileage) {
                const savedMaintenance = await this.maintenanceService.findOne({
                    where: { maintenanceId: maintenance.maintenanceId },
                    relations: ['consumable', 'consumable.vehicleInfo'],
                    order: { createdAt: 'DESC' },
                    withDeleted: true,
                });
                if (savedMaintenance.consumable.vehicleInfo.totalMileage < updateMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(
                        savedMaintenance.consumable.vehicleInfo.vehicleInfoId,
                        {
                            totalMileage: updateMaintenanceDto.mileage,
                        },
                        { queryRunner },
                    );
                }
            }
            await queryRunner.commitTransaction();
            return await this.maintenanceService.findOne({
                where: {
                    maintenanceId: maintenanceId,
                },
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
