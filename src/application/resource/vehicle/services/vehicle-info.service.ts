import { Injectable } from '@nestjs/common';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { FindVehicleInfoUsecase } from '../usecases/vehicle-info/findVehicleInfo.usecase';
import { UpdateVehicleInfoUsecase } from '../usecases/vehicle-info/updateVehicleInfo.usecase';
import { ResourceVehicleInfoService } from '@src/context/resource-management/services/resource-vehicle-info.service';
import {
    ReturnVehicleDetailResponseDto,
    ReturnVehicleResponseDto,
} from '@src/application/reservation/core/dtos/return-vehicle-response.dto';
import { FileService } from '@src/context/file/services/file.service';

@Injectable()
export class VehicleInfoService {
    constructor(
        private readonly findVehicleInfoUsecase: FindVehicleInfoUsecase,
        private readonly updateVehicleInfoUsecase: UpdateVehicleInfoUsecase,
        private readonly resourceVehicleInfoService: ResourceVehicleInfoService,
        private readonly fileService: FileService,
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

    async findReturnList(vehicleInfoId: string): Promise<ReturnVehicleResponseDto[]> {
        const returnList = await this.resourceVehicleInfoService.반납_리스트를_조회한다(vehicleInfoId);
        return returnList.map((returnVehicle) => {
            return {
                reservationVehicleId: returnVehicle.reservationVehicleId,
                returnedAt: returnVehicle.returnedAt,
                returnedBy: returnVehicle.returnedBy,
                endOdometer: returnVehicle.endOdometer,
                location: returnVehicle.location,
            };
        });
    }

    async findReturnDetail(reservationVehicleId: string): Promise<ReturnVehicleDetailResponseDto> {
        const returnDetail = await this.resourceVehicleInfoService.반납_상세정보를_조회한다(reservationVehicleId);
        const reservationVehicleFile = await this.fileService.차량예약_파일을_조회한다(reservationVehicleId);
        return {
            reservationVehicleId: returnDetail.reservationVehicleId,
            returnedAt: returnDetail.returnedAt,
            returnedBy: returnDetail.returnedBy,
            endOdometer: returnDetail.endOdometer,
            location: returnDetail.location,
            parkingLocationImages: reservationVehicleFile.parkingLocationImages.map((image) => image.filePath),
            odometerImages: reservationVehicleFile.odometerImages.map((image) => image.filePath),
            indoorImages: reservationVehicleFile.indoorImages.map((image) => image.filePath),
        };
    }
}
