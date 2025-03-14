import { VehicleInfoService } from '../services/vehicle-info.service';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationUsecase } from '@resource/modules/notification/application/usecases/notification.usecase';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
@Injectable()
export class VehicleInfoUsecase {
    constructor(
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly consumableService: ConsumableService,
        private readonly notificationUsecase: NotificationUsecase,
    ) {}

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
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfoResponseDto> {
        const previousVehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
            relations: ['consumables'],
        });
        const previousTotalMileage = Number(previousVehicleInfo.totalMileage);

        // 실제 업데이트
        const vehicleInfo = await this.vehicleInfoService.update(
            vehicleInfoId,
            updateVehicleInfoDto,
            repositoryOptions,
        );

        const afterVehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId: vehicleInfoId,
            },
            relations: ['consumables', 'resource', 'resource.resourceManagers'],
        });

        const afterTotalMileage = Number(afterVehicleInfo.totalMileage);
        const consumables = afterVehicleInfo.consumables;

        for (const consumable of consumables) {
            if (!consumable.notifyReplacementCycle) continue;
            const replaceCycle = Number(consumable.replaceCycle);
            const isReplace =
                Math.floor(afterTotalMileage / replaceCycle) > Math.floor(previousTotalMileage / replaceCycle);
            if (isReplace) {
                const notiTarget = afterVehicleInfo.resource.resourceManagers.map((manager) => manager.employeeId);

                await this.notificationUsecase.createNotification(
                    NotificationType.RESOURCE_CONSUMABLE_REPLACING,
                    {
                        resourceId: afterVehicleInfo.resource.resourceId,
                        resourceName: afterVehicleInfo.resource.name,
                        resourceType: afterVehicleInfo.resource.type,
                        consumableName: consumable.name,
                    },
                    notiTarget,
                    repositoryOptions,
                );
            }
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
}
