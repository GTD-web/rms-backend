import { Injectable, Logger } from '@nestjs/common';
import { NotificationContextService } from './notification.context.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Role } from '@libs/enums/role-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { QueryRunner, Raw } from 'typeorm';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { Notification } from '@libs/entities';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';

export interface ScheduleNotificationData {
    scheduleId: string;
    scheduleTitle: string;
    scheduleDescription?: string;
    startDate: Date;
    endDate: Date;
    reserverId: string;
    participantIds: string[];
    notifyMinutesBeforeStart?: number[];

    // 자원 예약 관련 정보 (있는 경우)
    reservationInfo?: {
        reservationId: string;
        resourceId: string;
        resourceName: string;
        resourceType: ResourceType;
        status: ReservationStatus;
    };

    // 프로젝트 관련 정보 (있는 경우)
    projectInfo?: {
        projectId: string;
        projectName?: string;
    };
}

interface NotificationTemplate {
    type: NotificationType;
    titleTemplate: (data: any) => string;
    bodyTemplate: (data: any) => string;
    shouldSchedule?: boolean;
    targetSelector?: (data: ScheduleNotificationData) => Promise<string[]>;
}

@Injectable()
export class ImprovedScheduleNotificationContextService {
    private readonly logger = new Logger(ImprovedScheduleNotificationContextService.name);

    // 알림 템플릿 정의
    private readonly notificationTemplates: Map<string, NotificationTemplate> = new Map([
        [
            'schedule_confirmed',
            {
                type: NotificationType.RESERVATION_STATUS_CONFIRMED,
                titleTemplate: (data) => `[일정 확정] ${data.scheduleTitle}`,
                bodyTemplate: (data) => this.formatDateRange(data.startDate, data.endDate),
            },
        ],
        [
            'resource_reservation_confirmed',
            {
                type: NotificationType.RESERVATION_STATUS_CONFIRMED,
                titleTemplate: (data) => `[${data.resourceName} 예약 확정] ${data.scheduleTitle}`,
                bodyTemplate: (data) => this.formatDateRange(data.startDate, data.endDate),
            },
        ],
        [
            'accommodation_pending',
            {
                type: NotificationType.RESERVATION_STATUS_PENDING,
                titleTemplate: (data) => `[숙소 확정 대기중] ${data.scheduleTitle}`,
                bodyTemplate: (data) => this.formatDateRange(data.startDate, data.endDate),
                targetSelector: async () => {
                    const admins = await this.getSystemAdmins();
                    return admins.map((admin) => admin.employeeId);
                },
            },
        ],
        [
            'reminder',
            {
                type: NotificationType.RESERVATION_DATE_UPCOMING,
                titleTemplate: (data) => this.generateReminderTitle(data),
                bodyTemplate: (data) => this.formatDateRange(data.startDate, data.endDate),
                shouldSchedule: true,
            },
        ],
    ]);

    constructor(
        private readonly notificationContextService: NotificationContextService,
        private readonly domainEmployeeService: DomainEmployeeService,
    ) {}

    /**
     * 일정 생성 완료 후 모든 관련 알림을 배치 처리한다
     * 기존 방식보다 효율적으로 개선됨
     */
    async 일정생성_완료_알림을_배치_처리한다(
        notificationData: ScheduleNotificationData,
        queryRunner?: QueryRunner,
    ): Promise<void> {
        try {
            this.logger.log(`일정 생성 완료 알림 배치 처리 시작: ${notificationData.scheduleId}`);

            const repositoryOptions: IRepositoryOptions<Notification> | undefined = queryRunner
                ? { queryRunner }
                : undefined;

            // 알림 생성 계획 수립
            const notificationPlans = await this.createNotificationPlans(notificationData);

            // 모든 대상자의 구독 정보를 한 번에 조회 (성능 개선)
            const allTargets = this.extractAllTargets(notificationPlans);
            const subscriptionMap = await this.batchGetSubscriptions(allTargets);

            // 알림을 배치로 생성 및 발송
            await this.executeBatchNotifications(notificationPlans, subscriptionMap, repositoryOptions);

            this.logger.log(`일정 생성 완료 알림 배치 처리 완료: ${notificationData.scheduleId}`);
        } catch (error) {
            this.logger.error(`일정 생성 완료 알림 배치 처리 실패: ${error.message}`, error.stack);
            // 알림 실패는 일정 생성 자체를 실패시키지 않음
        }
    }

    /**
     * 알림 생성 계획을 수립한다
     */
    private async createNotificationPlans(data: ScheduleNotificationData) {
        const plans = [];
        const allParticipants = Array.from(new Set([data.reserverId, ...data.participantIds]));

        // 1. 일정 확정 알림
        plans.push({
            template: 'schedule_confirmed',
            targets: allParticipants,
            data: {
                scheduleTitle: data.scheduleTitle,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });

        // 2. 자원 예약 관련 알림
        if (data.reservationInfo) {
            if (data.reservationInfo.status === ReservationStatus.CONFIRMED) {
                plans.push({
                    template: 'resource_reservation_confirmed',
                    targets: allParticipants,
                    data: {
                        scheduleTitle: data.scheduleTitle,
                        resourceName: data.reservationInfo.resourceName,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        ...data.reservationInfo,
                    },
                });
            } else if (
                data.reservationInfo.status === ReservationStatus.PENDING &&
                data.reservationInfo.resourceType === ResourceType.ACCOMMODATION
            ) {
                plans.push({
                    template: 'accommodation_pending',
                    targets: null, // targetSelector로 결정됨
                    data: {
                        scheduleTitle: data.scheduleTitle,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        ...data.reservationInfo,
                    },
                });
            }
        }

        // 3. 리마인더 알림
        if (data.notifyMinutesBeforeStart && data.notifyMinutesBeforeStart.length > 0) {
            for (const beforeMinutes of data.notifyMinutesBeforeStart) {
                plans.push({
                    template: 'reminder',
                    targets: allParticipants,
                    data: {
                        scheduleTitle: data.scheduleTitle,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        beforeMinutes,
                        resourceName: data.reservationInfo?.resourceName || '일정',
                        resourceType: data.reservationInfo?.resourceType || ResourceType.MEETING_ROOM,
                        reservationId: data.reservationInfo?.reservationId || data.scheduleId,
                    },
                });
            }
        }

        return plans;
    }

    /**
     * 모든 대상자를 추출한다
     */
    private extractAllTargets(plans: any[]): string[] {
        const allTargets = new Set<string>();
        for (const plan of plans) {
            if (plan.targets) {
                plan.targets.forEach((target: string) => allTargets.add(target));
            }
        }
        return Array.from(allTargets);
    }

    /**
     * 구독 정보를 배치로 조회한다 (성능 개선)
     */
    private async batchGetSubscriptions(employeeIds: string[]): Promise<Map<string, PushSubscriptionDto[]>> {
        const subscriptionMap = new Map<string, PushSubscriptionDto[]>();

        // 한 번의 쿼리로 모든 직원의 구독 정보 조회
        const employees = await this.domainEmployeeService.findAll({
            where: {
                employeeId: Raw((alias) => `${alias} = ANY(:employeeIds)`, { employeeIds }),
            },
            select: {
                employeeId: true,
                subscriptions: true,
                isPushNotificationEnabled: true,
            },
        });

        for (const employee of employees) {
            if (employee.subscriptions && employee.subscriptions.length > 0 && employee.isPushNotificationEnabled) {
                subscriptionMap.set(employee.employeeId, employee.subscriptions);
            } else {
                subscriptionMap.set(employee.employeeId, []);
            }
        }

        return subscriptionMap;
    }

    /**
     * 배치 알림을 실행한다
     */
    private async executeBatchNotifications(
        plans: any[],
        subscriptionMap: Map<string, PushSubscriptionDto[]>,
        repositoryOptions?: IRepositoryOptions<Notification>,
    ) {
        for (const plan of plans) {
            const template = this.notificationTemplates.get(plan.template);
            if (!template) continue;

            // 대상자 결정
            let targets = plan.targets;
            if (!targets && template.targetSelector) {
                targets = await template.targetSelector(plan.data);
            }
            if (!targets || targets.length === 0) continue;

            // 알림 내용 생성
            const notificationDto = {
                title: template.titleTemplate(plan.data),
                body: template.bodyTemplate(plan.data),
                notificationType: template.type,
                notificationData: this.createNotificationDataDto(plan.data),
                createdAt: template.shouldSchedule
                    ? this.calculateScheduledTime(plan.data.startDate, plan.data.beforeMinutes)
                    : DateUtil.now().format('YYYY-MM-DD HH:mm'),
                isSent: !template.shouldSchedule,
            };

            // 알림 저장
            const notification = await this.notificationContextService.알림을_저장한다(
                notificationDto,
                targets,
                repositoryOptions,
            );

            // 즉시 발송 알림 처리
            if (!template.shouldSchedule) {
                const totalSubscriptions: PushSubscriptionDto[] = [];
                for (const employeeId of targets) {
                    const subscriptions = subscriptionMap.get(employeeId) || [];
                    totalSubscriptions.push(...subscriptions);
                }

                if (totalSubscriptions.length > 0) {
                    await this.notificationContextService.다중_알림을_전송한다(totalSubscriptions, {
                        title: notification.title,
                        body: notification.body,
                        notificationType: notification.notificationType,
                        notificationData: notification.notificationData,
                    });
                }
            }
        }
    }

    /**
     * 시스템 관리자 목록을 조회한다
     */
    private async getSystemAdmins() {
        return await this.domainEmployeeService.findAll({
            where: {
                roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
            },
        });
    }

    /**
     * 날짜 범위를 포맷팅한다
     */
    private formatDateRange(startDate: Date, endDate: Date): string {
        return DateUtil.toAlarmRangeString(DateUtil.format(startDate), DateUtil.format(endDate));
    }

    /**
     * 리마인더 제목을 생성한다
     */
    private generateReminderTitle(data: any): string {
        const resourceTypeLabels = {
            [ResourceType.MEETING_ROOM]: '회의',
            [ResourceType.VEHICLE]: '차량 이용',
            [ResourceType.ACCOMMODATION]: '입실',
            [ResourceType.EQUIPMENT]: '장비 이용',
        };

        const label = resourceTypeLabels[data.resourceType] || '일정';
        return `[${data.scheduleTitle}] ${label} 시작까지 ${data.beforeMinutes}분 남았습니다.`;
    }

    /**
     * 스케줄된 시간을 계산한다
     */
    private calculateScheduledTime(startDate: Date, beforeMinutes: number): string {
        return DateUtil.parse(DateUtil.format(startDate)).addMinutes(-beforeMinutes).format('YYYY-MM-DD HH:mm');
    }

    /**
     * 알림 데이터 DTO를 생성한다
     */
    private createNotificationDataDto(data: any) {
        return {
            scheduleId: data.scheduleId,
            reservationId: data.reservationId,
            reservationTitle: data.scheduleTitle,
            reservationDate: this.formatDateRange(data.startDate, data.endDate),
            resourceId: data.resourceId || '',
            resourceName: data.resourceName || '',
            resourceType: data.resourceType || ResourceType.MEETING_ROOM,
            beforeMinutes: data.beforeMinutes,
        };
    }

    /**
     * 일정 삭제 시 관련 스케줄된 알림들을 정리한다
     */
    async 일정삭제_관련_알림을_정리한다(scheduleId: string, reservationId?: string): Promise<void> {
        try {
            if (reservationId) {
                await this.notificationContextService.스케줄_작업을_삭제한다(reservationId);
            }
            // TODO: 일정 ID 기반 알림 삭제 로직 추가 (필요시)
            this.logger.log(`일정 삭제 관련 알림 정리 완료: ${scheduleId}`);
        } catch (error) {
            this.logger.error(`일정 삭제 관련 알림 정리 실패: ${error.message}`, error.stack);
        }
    }
}
