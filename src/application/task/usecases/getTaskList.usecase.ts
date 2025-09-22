import { Injectable } from '@nestjs/common';
import { DateUtil } from '@libs/utils/date.util';
import { LessThan } from 'typeorm';
import { Role } from '@libs/enums/role-type.enum';
import { Employee } from '@libs/entities';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';

@Injectable()
export class GetTaskListUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly reservationService: DomainReservationService,
    ) {}

    async execute(user: Employee) {
        const delayedReturnReservations = await this.reservationService.findAll({
            where: {
                participants: {
                    employeeId: user.employeeId,
                    type: ParticipantsType.RESERVER,
                },
                status: ReservationStatus.CONFIRMED,
                endDate: LessThan(DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['participants', 'resource', 'reservationVehicles'],
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
                order: {
                    vehicleInfo: {
                        consumables: {
                            maintenances: {
                                date: 'DESC',
                            },
                        },
                    },
                },
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
