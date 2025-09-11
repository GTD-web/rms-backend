import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';
import { ReservationContextService } from '@src/context/reservation/services/reservation.context.service';
import { ReservationNotificationContextService } from '@src/context/notification/services/reservation-notification.context.service';
import { ScheduleQueryContextService } from '@src/context/schedule/services/schedule-query.context.service';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationContextService: ReservationContextService,
        private readonly notificationContextService: NotificationContextService,
        private readonly scheduleQueryContextService: ScheduleQueryContextService,
        private readonly reservationNotificationContextService: ReservationNotificationContextService,
    ) {}

    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        return this.reservationContextService.예약목록을_조회한다(startDate, endDate, resourceType, resourceId, status);
    }

    async findCheckReservationList(
        query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        return this.reservationContextService.확인필요_예약목록을_조회한다(query);
    }

    async findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationContextService.예약_상세를_조회한다(user, reservationId);
        const notifications = await this.notificationContextService.차량반납_알림을_조회한다(reservationId);
        return { ...reservation, notifications };
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        const updatedReservation = await this.reservationContextService.예약상태를_변경한다(reservationId, updateDto);

        // const notiTarget = [
        //     ...updatedReservation.resource.resourceManagers.map((manager) => manager.employeeId),
        //     ...updatedReservation.participants.map((reserver) => reserver.employeeId),
        // ];

        // if (updatedReservation.resource.notifyReservationChange && updateDto.status !== ReservationStatus.CLOSED) {
        //     try {
        //         let notificationType: NotificationType;
        //         switch (updateDto.status) {
        //             case ReservationStatus.CONFIRMED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_CONFIRMED;
        //                 break;
        //             case ReservationStatus.CANCELLED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_CANCELLED;
        //                 break;
        //             case ReservationStatus.REJECTED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_REJECTED;
        //                 break;
        //         }

        //         await this.notificationService.createNotification(
        //             notificationType,
        //             {
        //                 reservationId: updatedReservation.reservationId,
        //                 reservationTitle: updatedReservation.title,
        //                 reservationDate: DateUtil.toAlarmRangeString(
        //                     DateUtil.format(updatedReservation.startDate),
        //                     DateUtil.format(updatedReservation.endDate),
        //                 ),
        //                 resourceId: updatedReservation.resource.resourceId,
        //                 resourceName: updatedReservation.resource.name,
        //                 resourceType: updatedReservation.resource.type,
        //             },
        //             notiTarget,
        //         );
        //     } catch (error) {
        //         console.log(error);
        //         console.log('Notification creation failed in updateStatus');
        //     }
        // }

        return updatedReservation;
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        const result = await this.reservationContextService.차량을_반납한다(user, reservationId, returnDto);

        // 예약의 스케쥴 정보를 조회한다.
        const scheduleIds = await this.scheduleQueryContextService.예약의_일정ID들을_조회한다(reservationId);
        // 일정과_관계정보들을_조회한다
        const { resource } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(scheduleIds[0], {
            withReservation: true,
            withResource: true,
        });

        await this.reservationNotificationContextService.차량반납_알림을_전송한다({ resource }, [user.employeeId]);
        return result;
    }
}
