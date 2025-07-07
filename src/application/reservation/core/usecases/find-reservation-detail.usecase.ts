import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { Employee } from '@libs/entities';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Raw } from 'typeorm';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class FindReservationDetailUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly notificationService: DomainNotificationService,
        private readonly employeeNotificationService: DomainEmployeeNotificationService,
    ) {}

    async execute(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
                'reservationVehicles',
            ],
            withDeleted: true,
        });

        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        const reservationResponseDto = new ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some(
            (reserver) => reserver.employeeId === user.employeeId,
        );

        reservationResponseDto.returnable =
            reservationResponseDto.resource.type === ResourceType.VEHICLE
                ? reservationResponseDto.isMine &&
                  reservationResponseDto.reservationVehicles.some(
                      (reservationVehicle) => !reservationVehicle.isReturned,
                  ) &&
                  reservationResponseDto.startDate <= DateUtil.now().format()
                : null;

        reservationResponseDto.modifiable =
            [ReservationStatus.PENDING, ReservationStatus.CONFIRMED].includes(reservation.status) &&
            reservationResponseDto.isMine &&
            reservationResponseDto.endDate > DateUtil.now().format();

        const notifications = await this.notificationService.findAll({
            where: {
                notificationData: Raw((alias) => `${alias} ->> 'reservationId' = '${reservation.reservationId}'`),
                employees: {
                    employeeId: user.employeeId,
                    isRead: false,
                },
            },
            relations: ['employees'],
        });

        if (notifications.length > 0) {
            const employeeNotifications = notifications
                .map((notification) => notification.employees.map((employee) => employee.employeeNotificationId).flat())
                .flat();
            const updatedEmployeeNotifications = await Promise.all(
                employeeNotifications.map((employeeNotificationId) =>
                    this.employeeNotificationService.update(employeeNotificationId, {
                        isRead: true,
                    }),
                ),
            );
        }

        return reservationResponseDto;
    }
}
