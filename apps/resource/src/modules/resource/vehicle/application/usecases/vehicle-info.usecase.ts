import { VehicleInfoService } from '../services/vehicle-info.service';
import { VehicleInfoResponseDto } from '../dtos/vehicle-response.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableService } from '@resource/modules/resource/vehicle/application/services/consumable.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class VehicleInfoUsecase {
    constructor(
        private readonly vehicleInfoService: VehicleInfoService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async findVehicleInfo(vehicleInfoId: string): Promise<VehicleInfoResponseDto> {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: {
                vehicleInfoId,
            },
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
            withDeleted: true,
        });
        if (!previousVehicleInfo) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }

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
            withDeleted: true,
        });

        const afterTotalMileage = Number(afterVehicleInfo.totalMileage);
        const consumables = afterVehicleInfo.consumables;

        for (const consumable of consumables) {
            if (!consumable.notifyReplacementCycle) continue;
            const replaceCycle = Number(consumable.replaceCycle);
            const isReplace =
                Math.floor(afterTotalMileage / replaceCycle) > Math.floor(previousTotalMileage / replaceCycle);
            if (isReplace) {
                try {
                    const notiTarget = afterVehicleInfo.resource.resourceManagers.map((manager) => manager.employeeId);

                    this.eventEmitter.emit('create.notification', {
                        notificationType: NotificationType.RESOURCE_CONSUMABLE_REPLACING,
                        notificationData: {
                            resourceId: afterVehicleInfo.resource.resourceId,
                            resourceName: afterVehicleInfo.resource.name,
                            resourceType: afterVehicleInfo.resource.type,
                            consumableName: consumable.name,
                        },
                        notiTarget,
                        repositoryOptions,
                    });
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateVehicleInfo');
                }
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
