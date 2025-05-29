import { Injectable, BadRequestException } from '@nestjs/common';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus, ParticipantsType } from '@libs/enums/reservation-type.enum';
import { Employee } from '@libs/entities';
import { ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { IsNull, Not, Raw, In } from 'typeorm';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';

@Injectable()
export class FindResourcesByTypeAndDateWithReservationsUsecase {
    constructor(
        private readonly resourceService: DomainResourceService,
        private readonly resourceGroupService: DomainResourceGroupService,
        private readonly reservationService: DomainReservationService,
    ) {}

    async execute(
        user: Employee,
        type: ResourceType,
        startDate: string,
        endDate: string,
        isMine?: boolean,
    ): Promise<ResourceGroupWithResourcesResponseDto[]> {
        if (!!startDate && !!endDate && startDate > endDate) {
            throw new BadRequestException('Start date must be before end date');
        }

        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const startDateObj = regex.test(startDate)
            ? DateUtil.date(startDate).toDate()
            : DateUtil.date(startDate + ' 00:00:00').toDate();

        const endDateObj = regex.test(endDate)
            ? DateUtil.date(endDate).toDate()
            : DateUtil.date(endDate + ' 23:59:59').toDate();

        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: Not(IsNull()),
            },
            order: {
                order: 'ASC',
            },
        });

        const resourceGroupsWithResources = await Promise.all(
            resourceGroups.map(async (resourceGroup) => {
                const resources = await this.resourceService.findAll({
                    where: {
                        resourceGroupId: resourceGroup.resourceGroupId,
                    },
                    order: {
                        order: 'ASC',
                    },
                });

                const resourcesWithReservations = await Promise.all(
                    resources.map(async (resource) => {
                        const dateCondition = Raw(
                            (alias) =>
                                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
                              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
                              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
                            { startDateObj, endDateObj },
                        );

                        const where = {
                            startDate: dateCondition,
                            resourceId: resource.resourceId,
                            status: In([
                                ReservationStatus.PENDING,
                                ReservationStatus.CONFIRMED,
                                ReservationStatus.CLOSED,
                            ]),
                        };

                        const reservations = await this.reservationService.findAll({
                            where: where,
                            relations: ['participants', 'participants.employee'],
                            order: {
                                startDate: 'ASC',
                            },
                        });

                        const reservationResponseDtos = reservations
                            .map((reservation) => {
                                const isMine = reservation.participants.some(
                                    (participant) =>
                                        participant.type === ParticipantsType.RESERVER &&
                                        participant.employeeId === user.employeeId,
                                );
                                reservation.participants = reservation.participants.filter(
                                    (participant) => participant.type === ParticipantsType.RESERVER,
                                );
                                return {
                                    ...reservation,
                                    startDate: DateUtil.date(reservation.startDate).format(),
                                    endDate: DateUtil.date(reservation.endDate).format(),
                                    isMine: isMine,
                                };
                            })
                            .filter((reservation) => {
                                if (isMine) {
                                    return reservation.participants.some(
                                        (participant) => participant.employeeId === user.employeeId,
                                    );
                                }
                                return true;
                            });

                        return {
                            ...resource,
                            resourceId: resource.resourceId,
                            reservations: reservationResponseDtos,
                        };
                    }),
                );

                return {
                    ...resourceGroup,
                    resources: resourcesWithReservations,
                };
            }),
        );

        return resourceGroupsWithResources;
    }
}
