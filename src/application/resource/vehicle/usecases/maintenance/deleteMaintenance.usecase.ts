import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@resource/domain/maintenance/maintenance.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DataSource } from 'typeorm';
@Injectable()
export class DeleteMaintenanceUsecase {
    constructor(
        private readonly maintenanceService: DomainMaintenanceService,
        private readonly fileService: DomainFileService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(user: Employee, maintenanceId: string): Promise<void> {
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.maintenanceService.delete(maintenanceId, { queryRunner });
            await this.fileService.deleteFilesByFilePath(maintenance.images, { queryRunner });

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Failed to delete maintenance');
        } finally {
            await queryRunner.release();
        }
    }
}
