import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { UpdateVehicleInfoDto } from '../../dtos/update-vehicle-info.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class UpdateVehicleInfoUsecase {
    constructor(private readonly vehicleInfoService: DomainVehicleInfoService) {}

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

        const vehicleInfo = await this.vehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto);

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
    }
}
