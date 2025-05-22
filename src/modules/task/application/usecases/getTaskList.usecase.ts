import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../resource/common/application/services/resource.service';
import { ReservationService } from '../../../reservation/application/services/reservation.service';
import { DateUtil } from '@libs/utils/date.util';
import { MoreThan } from 'typeorm';
import { Role } from '@libs/enums/role-type.enum';
import { User as UserEntity } from '@libs/entities/user.entity';

@Injectable()
export class GetTaskListUsecase {
    constructor(
        private readonly resourceService: ResourceService,
        private readonly reservationService: ReservationService,
    ) {}

    async execute(user: UserEntity) {
        const delayedReturnReservations = await this.reservationService.findAll({
            where: {
                participants: {
                    employeeId: user.employeeId,
                },
                endDate: MoreThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['participants', 'reservationVehicles'],
        });

        const isResourceAdmin = user.roles.includes(Role.RESOURCE_ADMIN);
        const isSystemAdmin = user.roles.includes(Role.SYSTEM_ADMIN);

        const needReplaceConsumable = [];
        if (isResourceAdmin || isSystemAdmin) {
            const resources = await this.resourceService.findAll({
                where: {
                    ...(isSystemAdmin ? {} : { resourceManagers: { employeeId: user.employeeId } }),
                },
                relations: [
                    'resourceManagers',
                    'vehicleInfo',
                    'vehicleInfo.consumables',
                    'vehicleInfo.consumables.maintenances',
                ],
            });
            for (const resource of resources) {
                for (const consumable of resource.vehicleInfo?.consumables || []) {
                    const latestMaintenance = consumable.maintenances[consumable.maintenances.length - 1] || null;
                    if (latestMaintenance) {
                        const maintanceRequired =
                            resource.vehicleInfo.totalMileage - Number(latestMaintenance.mileage) >
                            consumable.replaceCycle;
                        if (maintanceRequired) {
                            needReplaceConsumable.push({
                                type: '소모품교체',
                                title: `${consumable.name} 교체 필요`,
                                reservationId: null,
                                resourceId: resource.resourceId,
                                resourceName: resource.name,
                                startDate: null,
                                endDate: null,
                            });
                        }
                    }
                }
            }
        }
        const items = [
            ...delayedReturnReservations.map((reservation) => {
                return {
                    type: '반납지연',
                    title: `${reservation.resource.name} 반납 지연 중`,
                    reservationId: reservation.reservationId,
                    resourceId: reservation.resource.resourceId,
                    resourceName: reservation.resource.name,
                    startDate: reservation.startDate,
                    endDate: reservation.endDate,
                };
            }),
            ...needReplaceConsumable,
        ];
        return {
            totalCount: items.length,
            items,
        };
    }
}
