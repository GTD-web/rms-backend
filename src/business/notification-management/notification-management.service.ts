import { Injectable } from '@nestjs/common';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';
import { CronNotificationContextService } from '@src/context/notification/services/cron-notification.context.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleQueryContextService } from '@src/context/schedule/services/schedule-query.context.service';

// Import DTOs from business layer index
import {
    PaginationQueryDto,
    NotificationListResponseDto,
    PushSubscriptionDto,
    NotificationTypeResponseDto,
    CreateNotificationDataDto,
} from '@src/business.dto.index';
import { DateUtil } from '@libs/utils/date.util';

/**
 * 알림 관리 비즈니스 서비스
 *
 * Context layer의 알림 서비스들을 orchestrate하여 비즈니스 로직을 처리합니다.
 * - 알림 구독/전송/조회/읽음 처리
 * - 크론 작업을 통한 예약 알림 전송
 * - MDC 규칙: Context 서비스들을 조합하여 비즈니스 플로우 관리
 */
@Injectable()
export class NotificationManagementService {
    constructor(
        private readonly notificationContextService: NotificationContextService,
        private readonly cronNotificationContextService: CronNotificationContextService,
        private readonly scheduleContextService: ScheduleQueryContextService,
    ) {}

    async 구독_목록을_조회한다(employeeIds: string[]): Promise<string[]> {
        return await this.notificationContextService.구독_목록을_조회한다(employeeIds);
    }

    // ==================== 알림 구독 관리 ====================

    /**
     * 웹 푸시 구독을 등록한다
     */
    async 웹푸시를_구독한다(employeeId: string, subscription: PushSubscriptionDto): Promise<void> {
        await this.notificationContextService.PUSH_알림을_구독한다(employeeId, subscription);
    }

    // ==================== 알림 전송 ====================

    /**
     * 알림을 전송한다 (일반 알림)
     */
    async 알림을_전송한다(
        notificationType: NotificationType,
        notificationData: CreateNotificationDataDto,
        notificationTarget: string[],
    ): Promise<void> {
        await this.notificationContextService.알림_전송_프로세스를_진행한다(
            notificationType,
            notificationData,
            notificationTarget,
        );
    }

    /**
     * 리마인더 알림을 전송한다
     */
    async 리마인더_알림을_전송한다(
        notificationData: CreateNotificationDataDto,
        notificationTarget: string[],
    ): Promise<void> {
        await this.notificationContextService.알림_전송_프로세스를_진행한다(
            NotificationType.RESERVATION_DATE_UPCOMING,
            notificationData,
            notificationTarget,
        );
    }

    /**
     * 푸시 알림을 직접 전송한다 (구독 성공 알림 등)
     */
    async 푸시_알림을_직접_전송한다(tokens: string[], payload: any): Promise<void> {
        await this.notificationContextService.알림을_전송한다(tokens, payload);
    }

    // ==================== 알림 조회 ====================

    /**
     * 내 알림 목록을 조회한다
     */
    async 내_알림_목록을_조회한다(
        employeeId: string,
        query: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<NotificationListResponseDto> {
        return await this.notificationContextService.내_알림_목록을_조회한다(employeeId, query, resourceType);
    }

    // ==================== 알림 읽음 처리 ====================

    /**
     * 특정 알림을 읽음 처리한다
     */
    async 알림을_읽음_처리한다(employeeId: string, notificationId: string): Promise<void> {
        await this.notificationContextService.알림을_읽음_처리한다(employeeId, notificationId);
    }

    /**
     * 모든 알림을 읽음 처리한다
     */
    async 모든_알림을_읽음_처리한다(employeeId: string): Promise<void> {
        await this.notificationContextService.모든_알림을_읽음_처리한다(employeeId);
    }
    // ==================== 알림 타입 관리 ====================

    /**
     * 모든 알림 타입 목록을 조회한다
     */
    async 알림_타입_목록을_조회한다(): Promise<NotificationTypeResponseDto[]> {
        return await this.notificationContextService.알림_타입_목록을_조회한다();
    }

    // ==================== 크론 작업 ====================

    /**
     * 다가오는 예약 알림을 전송한다 (크론 작업)
     */
    async 다가오는_일정의_알림을_전송한다(): Promise<any> {
        const upcomingSchedules = await this.scheduleContextService.다가오는_일정을_조회한다();
        if (upcomingSchedules.length === 0) {
            return;
        }
        const scheduledInfos = await this.scheduleContextService.복수_일정과_관계정보들을_조회한다(
            upcomingSchedules.map((schedule) => schedule.scheduleId),
            {
                withReservation: true,
                withResource: true,
                withParticipants: true,
            },
        );

        for (const scheduledInfo of scheduledInfos) {
            const { schedule, reservation, resource, participants } = scheduledInfo;
            const notificationData: CreateNotificationDataDto = {
                schedule: {
                    scheduleId: schedule.scheduleId,
                    scheduleTitle: schedule.title,
                    beforeMinutes: schedule.notifyMinutesBeforeStart[0],
                    startDate: DateUtil.format(schedule.startDate, 'YYYY-MM-DD HH:mm'),
                    endDate: DateUtil.format(schedule.endDate, 'YYYY-MM-DD HH:mm'),
                },
                reservation: {
                    reservationId: reservation?.reservationId,
                    reservationTitle: reservation?.title,
                    reservationDate: DateUtil.format(reservation?.startDate, 'YYYY-MM-DD HH:mm'),
                    status: reservation?.status,
                },
                resource: {
                    resourceId: resource?.resourceId,
                    resourceName: resource?.name,
                    resourceType: resource?.type,
                },
            };
            const notificationTarget = participants.map((participant) => participant.employee.employeeId);
            await this.notificationContextService.알림_전송_프로세스를_진행한다(
                NotificationType.RESERVATION_DATE_UPCOMING,
                notificationData,
                notificationTarget,
            );
        }
    }
}
