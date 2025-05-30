import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { UpdateVehicleInfoDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainFileService } from '@src/domain/file/file.service';
import { DataSource, Not } from 'typeorm';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { Consumable } from '@libs/entities';

@Injectable()
export class UpdateVehicleInfoUsecase {
    constructor(
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly consumableService: DomainConsumableService,
        private readonly fileService: DomainFileService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const vehicleInfo = await this.vehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto, {
                queryRunner,
            });

            const images = [
                ...(updateVehicleInfoDto.parkingLocationImages || []),
                ...(updateVehicleInfoDto.odometerImages || []),
                ...(updateVehicleInfoDto.indoorImages || []),
            ];

            if (images.length > 0) {
                await this.fileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
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
