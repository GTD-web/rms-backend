import { Injectable } from '@nestjs/common';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { FindVehicleInfoUsecase } from '../usecases/vehicle-info/findVehicleInfo.usecase';
import { UpdateVehicleInfoUsecase } from '../usecases/vehicle-info/updateVehicleInfo.usecase';

@Injectable()
export class VehicleInfoService {
    constructor(
        private readonly findVehicleInfoUsecase: FindVehicleInfoUsecase,
        private readonly updateVehicleInfoUsecase: UpdateVehicleInfoUsecase,
    ) {}

    async findVehicleInfo(vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        return this.findVehicleInfoUsecase.execute(vehicleInfoId);
    }

    async updateVehicleInfo(
        vehicleInfoId: string,
        updateVehicleInfoDto: UpdateVehicleInfoDto,
    ): Promise<VehicleInfoResponseDto> {
        return this.updateVehicleInfoUsecase.execute(vehicleInfoId, updateVehicleInfoDto);
    }
}
