import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class FindResourceDetailUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly fileService: DomainFileService,
        private readonly consumableService: DomainConsumableService,
        private readonly maintenanceService: DomainMaintenanceService,
    ) {}

    async executeForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);

        if (resource.vehicleInfo) {
            if (resource.resourceManagers.some((manager) => manager.employeeId === employeeId)) {
                resource.vehicleInfo['consumables'] = await this.consumableService.findAll({
                    where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
                });
            }

            if (resource.vehicleInfo.consumables && resource.vehicleInfo.consumables.length > 0) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    if (latestMaintenance) {
                        consumable.maintenances = [latestMaintenance].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    if (!a.maintenances?.length && !b.maintenances?.length) {
                        return a.name.localeCompare(b.name);
                    }
                    if (!a.maintenances?.length) return -1;
                    if (!b.maintenances?.length) return 1;
                    const aMileage = a.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    const bMileage = b.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    return aMileage - bMileage;
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.parkingLocationImages,
            );
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.odometerImages,
            );
            resource.vehicleInfo['indoorFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.indoorImages,
            );
        }
        return new ResourceResponseDto(resource);
    }

    async executeForAdmin(resourceId: string): Promise<ResourceResponseDto> {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });

        if (!resource) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }

        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);

        if (resource.vehicleInfo) {
            if (resource.vehicleInfo.consumables) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    if (latestMaintenance) {
                        consumable.maintenances = [latestMaintenance].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    if (!a.maintenances?.length && !b.maintenances?.length) {
                        return a.name.localeCompare(b.name);
                    }
                    if (!a.maintenances?.length) return -1;
                    if (!b.maintenances?.length) return 1;
                    const aMileage = a.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    const bMileage = b.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    return aMileage - bMileage;
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.parkingLocationImages,
            );
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.odometerImages,
            );
            resource.vehicleInfo['indoorFiles'] = await this.fileService.findAllFilesByFilePath(
                resource.vehicleInfo.indoorImages,
            );
        }

        return new ResourceResponseDto(resource);
    }
}
