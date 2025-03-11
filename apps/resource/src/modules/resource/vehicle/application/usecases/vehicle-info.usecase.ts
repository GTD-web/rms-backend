import { VehicleInfoService } from '../services/vehicle-info.service';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';

@Injectable()
export class VehicleInfoUsecase {
    constructor(private readonly vehicleInfoService: VehicleInfoService) {}

    async findVehicleInfo(vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId,
            },
        });
        if (!vehicleInfo) {
            throw new NotFoundException('Vehicle info not found');
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
        };
    }

    async updateVehicleInfo(
        vehicleInfoId: string,
        updateVehicleInfoDto: UpdateVehicleInfoDto,
    ): Promise<VehicleInfoResponseDto> {
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
        };
    }
}
