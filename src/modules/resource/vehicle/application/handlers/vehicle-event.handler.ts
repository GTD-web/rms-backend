import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { VehicleInfoService } from '@resource/modules/resource/vehicle/application/services/vehicle-info.service';

@Injectable()
export class VehicleEventHandler {
    constructor(private readonly vehicleInfoService: VehicleInfoService) {}

    @OnEvent('update.vehicle.info')
    async handleUpdateVehicleInfo(payload: {
        vehicleInfoId: string;
        updateData: any;
        repositoryOptions?: RepositoryOptions;
    }) {
        return await this.vehicleInfoService.update(
            payload.vehicleInfoId,
            payload.updateData,
            payload.repositoryOptions,
        );
    }
}
