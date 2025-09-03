import { Injectable } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { LessThan, MoreThan, Raw } from 'typeorm';
import { Role } from '@libs/enums/role-type.enum';
import { Employee } from '@libs/entities';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { NotificationType } from '@libs/enums/notification-type.enum';

@Injectable()
export class GetNeedRaplaceConsumablesUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly reservationService: DomainReservationService,
        private readonly notificationService: DomainNotificationService,
    ) {}

    async execute() {
        const resources = await this.resourceService.findAll({
            relations: [
                'resourceManagers',
                'resourceManagers.employee',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'vehicleInfo.consumables.maintenances',
            ],
        });
        const needReplaceConsumable = [];
        for (const resource of resources) {
            for (const consumable of resource.vehicleInfo?.consumables || []) {
                const latestMaintenance = consumable.maintenances[consumable.maintenances.length - 1] || null;
                if (latestMaintenance) {
                    const maintanceRequired =
                        resource.vehicleInfo.totalMileage - Number(latestMaintenance.mileage) > consumable.replaceCycle;
                    if (maintanceRequired) {
                        const notifications = await this.notificationService.findAll({
                            where: {
                                notificationType: NotificationType.RESOURCE_CONSUMABLE_DELAYED_REPLACING,
                                notificationData: Raw(
                                    (alias) =>
                                        `${alias} -> 'resource' ->> 'resourceId' = '${resource.resourceId}' AND ${alias} -> 'resource' -> 'vehicleInfo' -> 'consumable'  ->> 'consumableName' = '${consumable.name}'`,
                                ),
                                createdAt: MoreThan(DateUtil.date(latestMaintenance.date).format('YYYY-MM-DD HH:mm')),
                            },
                        });

                        needReplaceConsumable.push({
                            type: '소모품교체',
                            title: `${consumable.name} 교체 필요`,
                            reservationId: null,
                            resourceId: resource.resourceId,
                            resourceName: resource.name,
                            startDate: null,
                            endDate: null,
                            manager: {
                                employeeId: resource.resourceManagers[0].employee.employeeId,
                                name: resource.resourceManagers[0].employee.name,
                                employeeNumber: resource.resourceManagers[0].employee.employeeNumber,
                                department: resource.resourceManagers[0].employee.department,
                                position: resource.resourceManagers[0].employee.position,
                            },
                            notifications: notifications,
                        });
                    }
                }
            }
        }
        return needReplaceConsumable;
    }
}
