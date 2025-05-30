import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { UpdateVehicleInfoDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainFileService } from '@src/domain/file/file.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateVehicleInfoUsecase {
    constructor(
        private readonly vehicleInfoService: DomainVehicleInfoService,
        private readonly fileService: DomainFileService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(vehicleInfoId: string, updateVehicleInfoDto: UpdateVehicleInfoDto) {
        const previousVehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
            relations: ['consumables'],
            withDeleted: true,
        });
        if (!previousVehicleInfo) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }

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
