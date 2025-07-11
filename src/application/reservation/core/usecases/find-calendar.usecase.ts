import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Between, In, Raw } from 'typeorm';
import { CalendarResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { DateUtil } from '@libs/utils/date.util';
import { ReservationStatus, ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ReservationWithResourceResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities/employee.entity';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class FindCalendarUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly notificationService: DomainNotificationService,
    ) {}

    async execute(
        user: Employee,
        startDate: string,
        endDate: string,
        resourceType?: ResourceType,
        isMine?: boolean,
    ): Promise<CalendarResponseDto> {
        const startDateObj = DateUtil.date(startDate).toDate();
        const endDateObj = DateUtil.date(endDate).toDate();

        const dateCondition = Raw(
            (alias) =>
                `(${alias} BETWEEN :startDateObj AND :endDateObj OR
              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`,
            { startDateObj, endDateObj },
        );

        const where = {
            startDate: dateCondition,
            status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CLOSED]),
            ...(resourceType ? { resource: { type: resourceType } } : {}),
            ...(isMine ? { participants: { employeeId: user.employeeId, type: ParticipantsType.RESERVER } } : {}),
        };

        const reservations = await this.reservationService.findAll({
            where: where,
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            select: {
                reservationId: true,
                startDate: true,
                endDate: true,
                title: true,
                status: true,
                resource: {
                    resourceId: true,
                    name: true,
                    type: true,
                },
                participants: {
                    employeeId: true,
                    type: true,
                    employee: {
                        employeeId: true,
                        name: true,
                    },
                },
            },
        });

        return {
            reservations: await Promise.all(
                reservations.map(async (reservation) => {
                    const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);
                    const notification = await this.notificationService.findAll({
                        where: {
                            notificationData: Raw(
                                (alias) => `${alias} ->> 'reservationId' = '${reservation.reservationId}'`,
                            ),
                            employees: {
                                employeeId: user.employeeId,
                                isRead: false,
                            },
                        },
                        relations: ['employees'],
                    });

                    reservationResponseDto.hasUnreadNotification = notification.length > 0;
                    return reservationResponseDto;
                }),
            ),
        };
    }
}
