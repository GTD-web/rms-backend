import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { VehicleInfoRepositoryPort } from '@resource/modules/resource/vehicle/domain/ports/vehicle-info.repository.port';
import { VehicleInfo } from '@libs/entities';
import { CreateVehicleInfoDto } from '../dtos/create-vehicle-info.dto';
import { UpdateVehicleInfoDto } from '../dtos/update-vehicle-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { User } from '@libs/entities';
import { Role } from '@libs/enums/role-type.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationType } from '@libs/enums/notification-type.enum';
@Injectable()
export class VehicleInfoService {
    constructor(
        @Inject('VehicleInfoRepositoryPort')
        private readonly vehicleInfoRepository: VehicleInfoRepositoryPort,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async save(vehicleInfo: VehicleInfo, repositoryOptions?: RepositoryOptions): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.save(vehicleInfo, repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<VehicleInfo> {
        return this.vehicleInfoRepository.findOne(repositoryOptions);
    }

    async update(
        vehicleInfoId: string,
        updateData: UpdateVehicleInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<VehicleInfo> {
        try {
            return await this.vehicleInfoRepository.update(vehicleInfoId, updateData, repositoryOptions);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.createNotification(vehicleInfoId);
        }
    }

    async createNotification(vehicleInfoId: string): Promise<void> {
        const vehicleInfo = await this.vehicleInfoRepository.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'resource.resourceManagers', 'consumables', 'consumables.maintenances'],
        });
        const [systemUser] = await this.eventEmitter.emitAsync('find.user.system.admin');
        const notiTarget = [
            ...vehicleInfo.resource.resourceManagers.map((manager) => manager.employeeId),
            ...systemUser.map((user) => user.employeeId),
        ];

        for (const consumable of vehicleInfo.consumables) {
            if (!consumable.notifyReplacementCycle) continue;
            const replaceCycle = Number(consumable.replaceCycle);
            const initMileage = Number(consumable.initMileage);
            const totalMileage = Number(vehicleInfo.totalMileage);
            const lastMaintenanceMileage = consumable.maintenances[0]?.mileage;

            const standardMileage = totalMileage - initMileage;

            const isReplace =
                lastMaintenanceMileage && lastMaintenanceMileage > 0
                    ? totalMileage - lastMaintenanceMileage >= replaceCycle
                    : standardMileage >= replaceCycle;
            if (isReplace) {
                this.eventEmitter.emit('create.notification', {
                    notificationType: NotificationType.RESOURCE_CONSUMABLE_REPLACING,
                    notificationData: {
                        resourceId: vehicleInfo.resource.resourceId,
                        resourceName: vehicleInfo.resource.name,
                        resourceType: vehicleInfo.resource.type,
                        consumableName: consumable.name,
                    },
                    notiTarget,
                });
            }
        }
    }

    async checkRole(vehicleInfoId: string, user: User): Promise<boolean> {
        return true;
        // if (user.roles.includes(Role.SYSTEM_ADMIN)) return true;
        // const vehicleInfo = await this.findOne({
        //     where: { vehicleInfoId },
        //     relations: ['resource', 'resource.resourceManagers'],
        // });
        // return vehicleInfo.resource.resourceManagers.some((manager) => manager.employeeId === user.employeeId);
    }
}
