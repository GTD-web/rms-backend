import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { LessThan } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { Role } from '@libs/enums/role-type.enum';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';

@Injectable()
export class GetTaskStatusUsecase {
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

        if (delayedReturnReservations.length > 0 && needReplaceConsumable.length > 0) {
            return {
                title: '반납/교체 지연 발생',
            };
        } else if (delayedReturnReservations.length > 0) {
            return {
                title: '반납 지연 발생',
            };
        } else if (needReplaceConsumable.length > 0) {
            return {
                title: '소모품 교체 필요',
            };
        } else {
            return {
                title: '태스크 없음',
            };
        }
    }
}
