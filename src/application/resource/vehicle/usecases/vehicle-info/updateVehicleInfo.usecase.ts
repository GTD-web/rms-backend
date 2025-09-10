import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { UpdateVehicleInfoDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainFileVehicleInfoService } from '@src/domain/file-vehicle-info/file-vehicle-info.service';
import { DataSource, Not } from 'typeorm';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { Consumable } from '@libs/entities';

@Injectable()
export class UpdateVehicleInfoUsecase {
    constructor(
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly consumableService: DomainConsumableService,
        private readonly fileService: DomainFileService,
        private readonly fileVehicleInfoService: DomainFileVehicleInfoService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (!updateVehicleInfoDto.parkingLocationImages) updateVehicleInfoDto.parkingLocationImages = [];
            if (!updateVehicleInfoDto.odometerImages) updateVehicleInfoDto.odometerImages = [];
            if (!updateVehicleInfoDto.indoorImages) updateVehicleInfoDto.indoorImages = [];
            updateVehicleInfoDto.parkingLocationImages = updateVehicleInfoDto.parkingLocationImages.map((image) =>
                this.fileService.getFileUrl(image),
            );
            updateVehicleInfoDto.odometerImages = updateVehicleInfoDto.odometerImages.map((image) =>
                this.fileService.getFileUrl(image),
            );
            updateVehicleInfoDto.indoorImages = updateVehicleInfoDto.indoorImages.map((image) =>
                this.fileService.getFileUrl(image),
            );

            const vehicleInfo = await this.vehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto, {
                queryRunner,
            });

            const images = [
                ...updateVehicleInfoDto.parkingLocationImages,
                ...updateVehicleInfoDto.odometerImages,
                ...updateVehicleInfoDto.indoorImages,
            ];

            if (images.length > 0) {
                await this.fileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }

            // 기존 파일 연결 삭제
            await this.fileVehicleInfoService.deleteByVehicleInfoId(vehicleInfoId, { queryRunner });

            // 파일 경로로 파일 ID 찾아서 중간테이블에 연결
            const vehicleInfoConnections = [];

            if (updateVehicleInfoDto.parkingLocationImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(updateVehicleInfoDto.parkingLocationImages);
                const fileIds = files.map((file) => file.fileId);
                vehicleInfoConnections.push(
                    ...fileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'PARKING_LOCATION',
                    })),
                );
            }

            if (updateVehicleInfoDto.odometerImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(updateVehicleInfoDto.odometerImages);
                const fileIds = files.map((file) => file.fileId);
                vehicleInfoConnections.push(
                    ...fileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'ODOMETER',
                    })),
                );
            }

            if (updateVehicleInfoDto.indoorImages.length > 0) {
                const files = await this.fileService.findAllFilesByFilePath(updateVehicleInfoDto.indoorImages);
                const fileIds = files.map((file) => file.fileId);
                vehicleInfoConnections.push(
                    ...fileIds.map((fileId) => ({
                        vehicleInfoId,
                        fileId,
                        type: 'INDOOR',
                    })),
                );
            }

            if (vehicleInfoConnections.length > 0) {
                await this.fileVehicleInfoService.saveMultiple(vehicleInfoConnections, { queryRunner });
            }

            // 소모품 복사
            const hasConsumables = await this.consumableService.count({
                where: {
                    vehicleInfoId: vehicleInfoId,
                },
            });
            if (hasConsumables === 0) {
                const sourceConsumables = await queryRunner.manager
                    .createQueryBuilder(Consumable, 'consumable')
                    .select(
                        'DISTINCT ON (consumable.name) consumable.name, consumable.notifyReplacementCycle, consumable.replaceCycle',
                    )
                    .where('consumable.vehicleInfoId != :vehicleInfoId', { vehicleInfoId })
                    .orderBy('consumable.name', 'ASC')
                    .getRawMany();

                // 이름으로 그룹화하여 각 이름별로 하나씩만 선택
                const newConsumables = sourceConsumables.map((consumable) => {
                    const newConsumable = new Consumable();
                    newConsumable.vehicleInfoId = vehicleInfoId;
                    newConsumable.name = consumable.name;
                    newConsumable.notifyReplacementCycle = consumable.notifyReplacementCycle;
                    newConsumable.replaceCycle = consumable.replaceCycle;
                    newConsumable.initMileage = updateVehicleInfoDto.totalMileage || 0;
                    return newConsumable;
                });

                await this.consumableService.bulkCreate(newConsumables, {
                    queryRunner,
                });
            }

            await queryRunner.commitTransaction();
            return {
                vehicleInfoId: vehicleInfo.vehicleInfoId,
                resourceId: vehicleInfo.resourceId,
                totalMileage: Number(vehicleInfo.totalMileage),
                leftMileage: Number(vehicleInfo.leftMileage),
                insuranceName: vehicleInfo.insuranceName,
                insuranceNumber: vehicleInfo.insuranceNumber,
                parkingLocationImages: vehicleInfo.parkingLocationImages,
                odometerImages: vehicleInfo.odometerImages,
                indoorImages: vehicleInfo.indoorImages,
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
