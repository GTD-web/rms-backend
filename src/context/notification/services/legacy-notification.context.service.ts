import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Notification } from '@libs/entities';
import { PushNotificationPayload } from '../dtos/send-notification.dto';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { ResponseNotificationDto, NotificationDataDto } from '../dtos/response-notification.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { FCMAdapter } from '../adapter/fcm-push.adapter';
import { EmployeeMicroserviceAdapter } from '@src/domain/employee/adapters';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Raw, MoreThan, QueryRunner } from 'typeorm';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class NotificationContextService {
    private readonly logger = new Logger(NotificationContextService.name);

    constructor(
        private readonly domainNotificationService: DomainNotificationService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly domainEmployeeNotificationService: DomainEmployeeNotificationService,
        private readonly domainReservationService: DomainReservationService,
        private readonly fcmAdapter: FCMAdapter,
        private readonly employeeMicroserviceAdapter: EmployeeMicroserviceAdapter,
    ) {}

    isProduction = process.env.NODE_ENV === 'production';

    // 구독 관련 메서드들
    async 푸시_알림을_구독한다(
        authorization: string,
        employeeId: string,
        subscription: PushSubscriptionDto,
    ): Promise<boolean> {
        try {
            // SSO 서버로 FCM 토큰 구독 요청
            const fcmSubscribeDto = {
                fcmToken: subscription.fcm?.token,
            };

            if (!fcmSubscribeDto.fcmToken) {
                throw new BadRequestException('FCM 토큰이 필요합니다.');
            }

            const response = await this.employeeMicroserviceAdapter.subscribeFcm(
                authorization,
                employeeId,
                fcmSubscribeDto,
            );

            if (response.success) {
                return true;
            }

            return false;
        } catch (error) {
            console.log('SSO 서버 구독 실패:', error);
            return false;
        }
    }

    async 직접_알림을_전송한다(subscription: PushSubscriptionDto, payload: PushNotificationPayload): Promise<void> {
        await this.fcmAdapter.sendBulkNotification([subscription.fcm.token], payload);
    }

    async 다중_알림을_전송한다(tokens: string[], payload: PushNotificationPayload): Promise<BatchResponse> {
        return await this.fcmAdapter.sendBulkNotification(tokens, payload);
    }

    // 알림 조회 관련 메서드들
    async 내_알림_목록을_조회한다(
        employeeId: string,
        query?: PaginationQueryDto,
        resourceType?: ResourceType,
    ): Promise<PaginationData<ResponseNotificationDto>> {
        const whereCondition: any = {
            employees: { employeeId },
            isSent: true,
        };

        // ResourceType 필터링 추가 (JSON 컬럼 접근)
        if (resourceType) {
            whereCondition.notificationData = Raw(
                (alias) => `${alias} -> 'resource' ->> 'resourceType' = :resourceType`,
                {
                    resourceType,
                },
            );
        }

        const options: IRepositoryOptions<Notification> = {
            where: whereCondition,
        };
        const total = await this.domainNotificationService.count({
            where: options.where,
        });

        if (query) {
            options.skip = query.getOffset();
            options.take = query.limit;
        }
        const notifications = await this.domainNotificationService.findAll({
            ...options,
            relations: ['employees'],
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            items: notifications.map((notification) => {
                return {
                    notificationId: notification.notificationId,
                    title: notification.title,
                    body: notification.body,
                    notificationData: notification.notificationData,
                    notificationType: notification.notificationType,
                    createdAt: notification.createdAt,
                    isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }

    async 알림을_읽음_처리한다(employeeId: string, notificationId: string): Promise<void> {
        const employeeNotification = await this.domainEmployeeNotificationService.findOne({
            where: {
                employeeId,
                notificationId,
            },
        });
        if (!employeeNotification) {
            throw new BadRequestException('There is no data');
        }
        await this.domainEmployeeNotificationService.update(employeeNotification.employeeNotificationId, {
            isRead: true,
        });
    }

    /**
     * 모든 알림을 읽음 처리한다
     */
    async 모든_알림을_읽음_처리한다(employeeId: string): Promise<void> {
        try {
            this.logger.log(`모든 알림 읽음 처리 요청: ${employeeId}`);

            // 해당 직원의 모든 읽지 않은 알림을 조회
            const employeeNotifications = await this.domainEmployeeNotificationService.findAll({
                where: {
                    employeeId,
                    isRead: false,
                },
            });

            if (employeeNotifications.length > 0) {
                // 모든 읽지 않은 알림을 읽음 처리
                const updatePromises = employeeNotifications.map((notification) =>
                    this.domainEmployeeNotificationService.update(notification.employeeNotificationId, {
                        isRead: true,
                    }),
                );

                await Promise.all(updatePromises);
                this.logger.log(`모든 알림 읽음 처리 완료: ${employeeId} - ${employeeNotifications.length}개 처리`);
            } else {
                this.logger.log(`읽지 않은 알림이 없습니다: ${employeeId}`);
            }
        } catch (error) {
            this.logger.error(`모든 알림 읽음 처리 실패: ${error.message}`, error.stack);
            throw new BadRequestException('모든 알림 읽음 처리 중 오류가 발생했습니다.');
        }
    }

    // 구독 정보 조회 관련 메서드들
    async 구독_정보를_조회한다(token?: string, employeeId?: string) {
        if (!token && !employeeId) {
            return null;
        }

        if (employeeId) {
            return await this.직원별_구독정보를_조회한다(employeeId);
        }

        return await this.토큰별_구독정보를_조회한다(token);
    }

    async 시스템_관리자들에게_알림을_발송한다() {
        // createNotificationDataDto: CreateNotificationDataDto, // notificationType: NotificationType,
        // // 시스템 관리자들에게 알림 발송
        // const systemAdmins = await this.domainEmployeeService.findAll({
        //     where: {
        //         roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
        //     },
        // });
        // const consumable = await this.domainConsumableService.findOne({
        //     where: { consumableId: maintenance.consumableId },
        //     relations: ['vehicleInfo', 'vehicleInfo.resource'],
        //     withDeleted: true,
        // });
        // await this.notificationService.createNotification(
        //     NotificationType.RESOURCE_MAINTENANCE_COMPLETED,
        //     {
        //         resourceId: consumable.vehicleInfo.resource.resourceId,
        //         resourceType: consumable.vehicleInfo.resource.type,
        //         consumableName: consumable.name,
        //         resourceName: consumable.vehicleInfo.resource.name,
        //     },
        //     systemAdmins.map((admin) => admin.employeeId),
        // );
    }

    async 토큰별_구독정보를_조회한다(token: string) {
        const employee = await this.domainEmployeeService.findOne({
            where: {
                subscriptions: Raw(
                    (alias) => `
                EXISTS (
                  SELECT 1 FROM jsonb_array_elements(${alias}) AS elem
                  WHERE elem -> 'fcm' ->> 'token' = '${token}'
                )
              `,
                ),
            },
        });

        return {
            employeeId: employee.employeeId,
            employeeName: employee.name,
            subscriptions: employee.subscriptions,
        };
    }

    async 직원별_구독정보를_조회한다(employeeId: string) {
        const employee = await this.domainEmployeeService.findOne({
            where: { employeeId },
        });
        return {
            employeeId: employee.employeeId,
            employeeName: employee.name,
            subscriptions: employee.subscriptions,
        };
    }

    async 구독_목록을_조회한다(employeeId: string): Promise<PushSubscriptionDto[]> {
        const employee = await this.domainEmployeeService.findOne({
            where: { employeeId },
            select: { subscriptions: true, isPushNotificationEnabled: true },
        });

        if (
            !employee ||
            !employee.subscriptions ||
            employee.subscriptions.length === 0 ||
            !employee.isPushNotificationEnabled
        ) {
            return [];
        }
        return employee.subscriptions;
    }

    // 알림 생성 관련 메서드들
    async 알림_내용을_생성한다(
        notificationType: NotificationType,
        createNotificationDataDto: CreateNotificationDataDto,
    ): Promise<CreateNotificationDto> {
        const createNotificationDto: CreateNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: createNotificationDataDto,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                createNotificationDto.title = `예약 시간이 ${createNotificationDataDto.schedule.beforeMinutes}분 남았습니다.`;
                createNotificationDto.body = `${createNotificationDataDto.resource.resourceName}`;
                createNotificationDto.createdAt = DateUtil.parse(createNotificationDataDto.schedule.startDate)
                    .addMinutes(-createNotificationDataDto.schedule.beforeMinutes)
                    .format('YYYY-MM-DD HH:mm');
                createNotificationDto.isSent = false;
                break;
            case NotificationType.RESERVATION_STATUS_PENDING:
                createNotificationDto.title = `[숙소 확정 대기중] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESERVATION_TIME_CHANGED:
                createNotificationDto.title = `[예약 시간 변경] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDataDto.reservation.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDataDto.resource.vehicleInfo.consumable.consumableName}`;
                createNotificationDto.body = `${createNotificationDataDto.resource.resourceName}`;
                break;
            case NotificationType.RESOURCE_CONSUMABLE_DELAYED_REPLACING:
                createNotificationDto.title = `[교체 지연 알림] ${createNotificationDataDto.resource.vehicleInfo.consumable.consumableName}`;
                createNotificationDto.body = `${createNotificationDataDto.resource.resourceName}`;
                break;
            case NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = `${createNotificationDataDto.resource.resourceName}`;
                break;
            case NotificationType.RESOURCE_VEHICLE_DELAYED_RETURNED:
                createNotificationDto.title = `[차량 반납 지연 알림] ${createNotificationDataDto.resource.resourceName}`;
                createNotificationDto.body = `${createNotificationDataDto.reservation.reservationDate}`;
                break;
            case NotificationType.RESOURCE_MAINTENANCE_COMPLETED:
                createNotificationDto.title = `[정비 완료] ${createNotificationDataDto.resource.vehicleInfo.consumable.consumableName}`;
                createNotificationDto.body = `${createNotificationDataDto.resource.resourceName}`;
                break;
        }

        return createNotificationDto;
    }

    async 알림을_저장한다(
        createNotificationDto: CreateNotificationDto,
        notiTarget: string[],
        repositoryOptions?: IRepositoryOptions<Notification>,
    ) {
        const notification = await this.domainNotificationService.save(createNotificationDto, repositoryOptions);
        // employee 와 연결 필요
        for (const employeeId of notiTarget) {
            await this.domainEmployeeNotificationService.save(
                {
                    employeeId: employeeId,
                    notificationId: notification.notificationId,
                },
                repositoryOptions,
            );
        }
        return notification;
    }

    async 리마인더_알림_내용을_생성한다(
        createNotificationDataDto: CreateNotificationDataDto,
    ): Promise<CreateNotificationDto> {
        const now = DateUtil.now().toDate();
        const reservation = await this.domainReservationService.findOne({
            where: {
                reservationId: createNotificationDataDto.reservation.reservationId,
            },
        });
        const diffInMilliseconds = reservation.startDate.getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        const days = Math.floor(diffInMinutes / (24 * 60));
        const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
        const minutes = diffInMinutes % 60;

        const parts: string[] = [];
        if (diffInMilliseconds > 0) {
            switch (createNotificationDataDto.resource.resourceType) {
                case ResourceType.MEETING_ROOM:
                    parts.push('회의 시작까지');
                    break;
                case ResourceType.VEHICLE:
                    parts.push('차량 이용 시작까지');
                    break;
                case ResourceType.ACCOMMODATION:
                    parts.push('입실 까지');
                    break;
                case ResourceType.EQUIPMENT:
                    parts.push('장비 이용 시작까지');
                    break;
            }

            if (days > 0) {
                parts.push(`${days}일`);
            }
            if (hours > 0) {
                parts.push(`${hours}시간`);
            }
            if (minutes > 0 || parts.length === 0) {
                parts.push(`${minutes}분`);
            }

            parts.push('남았습니다.');
        } else {
            switch (createNotificationDataDto.resource.resourceType) {
                case ResourceType.MEETING_ROOM:
                    parts.push('회의 참여 알림');
                    break;
                case ResourceType.VEHICLE:
                    parts.push('차량 탑승 알림');
                    break;
                case ResourceType.ACCOMMODATION:
                    parts.push('입실 알림');
                    break;
                case ResourceType.EQUIPMENT:
                    parts.push('장비 이용 알림');
                    break;
            }
        }

        const timeDifferencePhrase = parts.join(' ');

        return {
            title: `[${createNotificationDataDto.reservation.reservationTitle}]\n${timeDifferencePhrase}`,
            body: createNotificationDataDto.reservation.reservationDate,
            notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
            notificationData: createNotificationDataDto,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
    }

    async 알림을_생성한다(
        notificationType: NotificationType,
        createNotificationDataDto: CreateNotificationDataDto,
        notiTarget: string[],
        repositoryOptions?: IRepositoryOptions<Notification>,
    ): Promise<void> {
        notiTarget = Array.from(new Set(notiTarget));
        const notificationDto = await this.알림_내용을_생성한다(notificationType, createNotificationDataDto);
        const notification = await this.알림을_저장한다(notificationDto, notiTarget, repositoryOptions);

        const totalSubscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.구독_목록을_조회한다(employeeId);
            totalSubscriptions.push(...subscriptions);
        }

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                // this.스케줄_작업을_생성한다(notification, totalSubscriptions);
                break;
            default:
                await this.다중_알림을_전송한다(
                    totalSubscriptions.map((subscription) => subscription.fcm.token),
                    {
                        title: notification.title,
                        body: notification.body,
                        notificationType: notification.notificationType,
                        notificationData: notification.notificationData,
                    },
                );
                break;
        }
    }

    async 리마인더_알림을_전송한다(
        notificationType: NotificationType,
        createNotificationDataDto: CreateNotificationDataDto,
        notiTarget: string[],
    ): Promise<void> {
        const createNotificationDto = await this.리마인더_알림_내용을_생성한다(createNotificationDataDto);

        if (!createNotificationDto) {
            return;
        }

        const notification = await this.알림을_저장한다(createNotificationDto, notiTarget);

        const totalSubscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.구독_목록을_조회한다(employeeId);
            totalSubscriptions.push(...subscriptions);
        }

        await this.다중_알림을_전송한다(
            totalSubscriptions.map((subscription) => subscription.fcm.token),
            {
                title: notification.title,
                body: notification.body,
                notificationType: notification.notificationType,
                notificationData: notification.notificationData,
            },
        );
    }

    async 요청_알림을_전송한다(
        notificationType: NotificationType,
        createNotificationDataDto: CreateNotificationDataDto,
        notiTarget: string[],
    ): Promise<void> {
        const createNotificationDto = await this.알림_내용을_생성한다(notificationType, createNotificationDataDto);

        if (!createNotificationDto) {
            return;
        }

        const notification = await this.알림을_저장한다(createNotificationDto, notiTarget);

        const totalSubscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.구독_목록을_조회한다(employeeId);
            totalSubscriptions.push(...subscriptions);
        }

        await this.다중_알림을_전송한다(
            totalSubscriptions.map((subscription) => subscription.fcm.token),
            {
                title: notification.title,
                body: notification.body,
                notificationType: notification.notificationType,
                notificationData: notification.notificationData,
            },
        );
    }

    async 스케줄_작업을_삭제한다(reservationId: string) {
        const notifications = await this.domainNotificationService.findAll({
            where: {
                notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
                notificationData: Raw((alias) => `${alias} -> 'reservation' ->> 'reservationId' = '${reservationId}'`),
                isSent: false,
            },
        });
        for (const notification of notifications) {
            await this.domainEmployeeNotificationService.deleteByNotificationId(notification.notificationId);
            await this.domainNotificationService.delete(notification.notificationId);
        }
    }

    // ==================== 태스크 관련 메서드들 ====================

    /**
     * 소모품 교체 알림을 조회한다
     */
    async 소모품교체_알림을_조회한다(resourceId: string, consumableName: string, date: Date): Promise<any[]> {
        const notifications = await this.domainNotificationService.findAll({
            where: {
                notificationType: NotificationType.RESOURCE_CONSUMABLE_DELAYED_REPLACING,
                notificationData: Raw(
                    (alias) =>
                        `${alias} -> 'resource' ->> 'resourceId' = '${resourceId}' AND ${alias} -> 'resource' -> 'vehicleInfo' -> 'consumable' ->> 'consumableName' = '${consumableName}'`,
                ),
            },
        });

        return notifications;
    }

    async 차량반납_알림을_조회한다(reservationId: string) {
        const notifications = await this.domainNotificationService.findAll({
            where: {
                notificationData: Raw((alias) => `${alias} -> 'reservation' ->> 'reservationId' = '${reservationId}'`),
                notificationType: NotificationType.RESOURCE_VEHICLE_DELAYED_RETURNED,
            },
        });

        return notifications;
    }
}
