import { Injectable } from '@nestjs/common';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { VehicleInfoResponseDto } from '../../dtos/vehicle-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FindVehicleInfoUsecase {
    constructor(private readonly vehicleInfoService: DomainVehicleInfoService) {}

    async execute(vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
        });

        if (!vehicleInfo) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }

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
