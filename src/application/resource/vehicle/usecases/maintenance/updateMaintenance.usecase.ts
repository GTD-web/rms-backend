import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, MoreThan, Not } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { UpdateMaintenanceDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileMaintenanceService } from '@src/domain/file-maintenance/file-maintenance.service';

@Injectable()
export class UpdateMaintenanceUsecase {
    constructor(
        private readonly maintenanceService: DomainMaintenanceService,
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly dataSource: DataSource,
        private readonly fileService: DomainFileService,
        private readonly fileMaintenanceService: DomainFileMaintenanceService,
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
            if (!updateMaintenanceDto.images) updateMaintenanceDto.images = [];
            updateMaintenanceDto.images = updateMaintenanceDto.images.map((image) =>
                this.fileService.getFileUrl(image),
            );
            const maintenance = await this.maintenanceService.update(maintenanceId, updateMaintenanceDto);
            await this.fileService.updateTemporaryFiles(updateMaintenanceDto.images, false, { queryRunner });

            // 기존 파일 연결 삭제
            await this.fileMaintenanceService.deleteByMaintenanceId(maintenanceId, { queryRunner });

            // 파일 경로로 파일 ID 찾아서 중간테이블에 연결
            if (updateMaintenanceDto.images.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(updateMaintenanceDto.images);
                const fileIds = files.map((file) => file.fileId);

                if (fileIds.length > 0) {
                    const fileMaintenanceConnections = fileIds.map((fileId) => ({
                        maintenanceId,
                        fileId,
                    }));

                    await this.fileMaintenanceService.saveMultiple(fileMaintenanceConnections, { queryRunner });
                }
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
