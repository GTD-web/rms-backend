import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NotificationContextService } from './notification.context.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { Reservation } from '@libs/entities/reservation.entity';
import { Resource } from '@libs/entities/resource.entity';
import { DateUtil } from '@libs/utils/date.util';
import { CreateNotificationDataDto } from '@src/context/notification/dtos/create-notification.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleUpdateResult } from '@src/context/schedule/services/schedule-state-transition.service';
import { UpdateScenarios } from '@src/context/schedule/services/schedule-policy.service';

@Injectable()
export class ScheduleNotificationContextService {
    private readonly logger = new Logger(ScheduleNotificationContextService.name);
    constructor(private readonly notificationContextService: NotificationContextService) {}

    async 일정_생성_알림을_전송한다(
        data: { schedule: Schedule; reservation: Reservation; resource: Resource },
        targetEmployeeIds: string[],
        adminEmployeeIds: string[],
    ): Promise<void> {
        const notificationData: CreateNotificationDataDto = {
            schedule: {
                scheduleId: data.schedule.scheduleId,
                scheduleTitle: data.schedule.title,
                startDate: DateUtil.format(data.schedule.startDate, 'YYYY-MM-DD HH:mm'),
                endDate: DateUtil.format(data.schedule.endDate, 'YYYY-MM-DD HH:mm'),
            },
            reservation: {
                reservationId: data.reservation?.reservationId,
            },
            resource: {
                resourceId: data.resource?.resourceId,
                resourceName: data.resource?.name,
                resourceType: data.resource?.type,
            },
        };

        if (
            data.reservation?.status === ReservationStatus.PENDING &&
            data.resource?.type === ResourceType.ACCOMMODATION
        ) {
            await this.notificationContextService.알림_전송_프로세스를_진행한다(
                NotificationType.RESERVATION_STATUS_PENDING,
                notificationData,
                adminEmployeeIds,
            );
        } else if (data.reservation?.status === ReservationStatus.CONFIRMED) {
            await this.notificationContextService.알림_전송_프로세스를_진행한다(
                NotificationType.RESERVATION_STATUS_CONFIRMED,
                notificationData,
                targetEmployeeIds,
            );
        }
    }

    async 일정_취소_알림을_전송한다(
        data: { schedule: Schedule; reservation: Reservation; resource: Resource },
        targetEmployeeIds: string[],
    ): Promise<void> {
        const notificationData: CreateNotificationDataDto = {
            schedule: {
                scheduleId: data.schedule.scheduleId,
                scheduleTitle: data.schedule.title,
                startDate: DateUtil.format(data.schedule.startDate, 'YYYY-MM-DD HH:mm'),
                endDate: DateUtil.format(data.schedule.endDate, 'YYYY-MM-DD HH:mm'),
            },
            reservation: {
                reservationId: data.reservation?.reservationId,
            },
            resource: {
                resourceId: data.resource?.resourceId,
                resourceName: data.resource?.name,
                resourceType: data.resource?.type,
            },
        };

        await this.notificationContextService.알림_전송_프로세스를_진행한다(
            NotificationType.RESERVATION_STATUS_CANCELLED,
            notificationData,
            targetEmployeeIds,
        );
    }

    async 일정_수정_알림을_전송한다(
        updateScenarios: UpdateScenarios,
        data: { schedule: Schedule; reservation: Reservation; resource: Resource },
        targetEmployeeIds: string[],
    ): Promise<void> {
        const notificationData: CreateNotificationDataDto = {
            schedule: {
                scheduleId: data.schedule.scheduleId,
                scheduleTitle: data.schedule.title,
                startDate: DateUtil.format(data.schedule.startDate, 'YYYY-MM-DD HH:mm'),
                endDate: DateUtil.format(data.schedule.endDate, 'YYYY-MM-DD HH:mm'),
            },
            reservation: {
                reservationId: data.reservation?.reservationId,
            },
            resource: {
                resourceId: data.resource?.resourceId,
                resourceName: data.resource?.name,
                resourceType: data.resource?.type,
            },
        };
        if (updateScenarios.isDateUpdate || updateScenarios.isResourceUpdate) {
            await this.notificationContextService.알림_전송_프로세스를_진행한다(
                NotificationType.RESERVATION_TIME_CHANGED,
                notificationData,
                targetEmployeeIds,
            );
        } else if (updateScenarios.isInfoUpdate && targetEmployeeIds.length > 0) {
            await this.notificationContextService.알림_전송_프로세스를_진행한다(
                NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                notificationData,
                targetEmployeeIds,
            );
        }
    }
}
