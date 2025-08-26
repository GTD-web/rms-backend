import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EmployeeMicroserviceAdapter } from '@src/domain/employee/adapters/employee-microservice.adapter';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { PushNotificationPayload } from '../dtos/send-notification.dto';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { FCMAdapter } from '../adapter/fcm-push.adapter';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { Notification } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { ResponseNotificationDto, NotificationDataDto } from '../dtos/response-notification.dto';
import { DataSource, In, MoreThan, QueryRunner, Raw } from 'typeorm';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
import { DateUtil } from '@libs/utils/date.util';

export interface NotificationData {
    schedule: {
        scheduleId: string;
        scheduleTitle: string;
        beforeMinutes?: number;
        startDate: Date;
        endDate: Date;
    };
    reservation: {
        reservationId: string;
        reservationTitle: string;
        reservationDate: string;
        status: ReservationStatus;
    };
    resource: {
        resourceId: string;
        resourceName: string;
        resourceType: ResourceType;
        vehicleInfo: {
            consumable: {
                consumableName: string;
            };
        };
    };
    project: {
        projectId: string;
        projectName?: string;
    };
}

@Injectable()
export class NotificationContextService {
    private readonly logger = new Logger(NotificationContextService.name);
    constructor(
        private readonly employeeMicroserviceAdapter: EmployeeMicroserviceAdapter,
        private readonly fcmAdapter: FCMAdapter,
        private readonly domainNotificationService: DomainNotificationService,
        private readonly domainEmployeeNotificationService: DomainEmployeeNotificationService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly dataSource: DataSource,
    ) {}

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
            whereCondition.notificationData = Raw((alias) => `${alias} ->> 'resourceType' = :resourceType`, {
                resourceType,
            });
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
                        `${alias} ->> 'resourceId' = '${resourceId}' AND ${alias} ->> 'consumableName' = '${consumableName}'`,
                ),
                createdAt: MoreThan(DateUtil.date(date).format('YYYY-MM-DD HH:mm')),
            },
        });

        return notifications;
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

    async PUSH_알림을_구독한다(employeeId: string, subscription: PushSubscriptionDto): Promise<boolean> {
        const employee = await this.domainEmployeeService.findOne({
            where: { employeeId },
        });

        if (!employee) {
            throw new BadRequestException('Employee not found');
        }

        employee.subscriptions = [subscription as any];
        const updatedEmployee = await this.domainEmployeeService.save(employee);

        return updatedEmployee.subscriptions.length > 0;
        // try {
        //     // SSO 서버로 FCM 토큰 구독 요청
        //     const fcmSubscribeDto = {
        //         fcmToken: subscription.fcm?.token,
        //     };

        //     if (!fcmSubscribeDto.fcmToken) {
        //         throw new BadRequestException('FCM 토큰이 필요합니다.');
        //     }

        //     const response = await this.employeeMicroserviceAdapter.subscribeFcm(
        //         authorization,
        //         employeeId,
        //         fcmSubscribeDto,
        //     );

        //     if (response.success) {
        //         return true;
        //     }

        //     return false;
        // } catch (error) {
        //     console.log('SSO 서버 구독 실패:', error);
        //     return false;
        // }
    }

    async 구독_목록을_조회한다(employeeIds: string[]): Promise<string[]> {
        const employees = await this.domainEmployeeService.findAll({
            where: { employeeId: In(employeeIds) },
            select: { subscriptions: true, isPushNotificationEnabled: true },
        });

        if (!employees || employees.length === 0 || !employees.some((employee) => employee.isPushNotificationEnabled)) {
            return [];
        }
        return employees.flatMap((employee) => employee.subscriptions.map((subscription) => subscription.fcm.token));

        // const tokens = await this.employeeMicroserviceAdapter.getFcmTokens(authorization, [employeeId]);
        // if (tokens.length === 0) {
        //     return [];
        // }
        // return tokens.map((token) => token.fcmToken);
    }

    async 알림_내용을_생성한다(
        notificationType: NotificationType,
        notificationData: CreateNotificationDataDto,
    ): Promise<CreateNotificationDto> {
        const createNotificationDto: CreateNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: notificationData,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: false,
        };

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                if (notificationData.schedule?.beforeMinutes) {
                    createNotificationDto.title = `예약 시간이 ${notificationData.schedule?.beforeMinutes}분 남았습니다.`;
                    createNotificationDto.body = this._자원명_추출(notificationData);
                    if (notificationData.schedule?.startDate) {
                        createNotificationDto.createdAt = DateUtil.parse(notificationData.schedule.startDate)
                            .addMinutes(-(notificationData.schedule?.beforeMinutes || 10))
                            .format('YYYY-MM-DD HH:mm');
                    }
                } else {
                    const { title, body, createdAt } = await this._생성_리마인더_알림(notificationData);
                    createNotificationDto.title = title;
                    createNotificationDto.body = body;
                    createNotificationDto.createdAt = createdAt;
                }

                break;

            case NotificationType.RESERVATION_STATUS_PENDING:
                createNotificationDto.title = `[숙소 확정 대기중] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESERVATION_TIME_CHANGED:
                createNotificationDto.title = `[예약 시간 변경] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${notificationData.resource?.vehicleInfo?.consumable?.consumableName || '소모품'}`;
                createNotificationDto.body = this._자원명_추출(notificationData);
                break;

            case NotificationType.RESOURCE_CONSUMABLE_DELAYED_REPLACING:
                createNotificationDto.title = `[교체 지연 알림] ${notificationData.resource?.vehicleInfo?.consumable?.consumableName || '소모품'}`;
                createNotificationDto.body = this._자원명_추출(notificationData);
                break;

            case NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = this._자원명_추출(notificationData);
                break;

            case NotificationType.RESOURCE_VEHICLE_DELAYED_RETURNED:
                createNotificationDto.title = `[차량 반납 지연 알림] ${this._자원명_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;

            case NotificationType.RESOURCE_MAINTENANCE_COMPLETED:
                createNotificationDto.title = `[정비 완료] ${notificationData.resource?.vehicleInfo?.consumable?.consumableName || '소모품'}`;
                createNotificationDto.body = this._자원명_추출(notificationData);
                break;

            default:
                // 기본 알림 형식
                createNotificationDto.title = `[알림] ${this._제목_추출(notificationData)}`;
                createNotificationDto.body = this._날짜_추출(notificationData);
                break;
        }

        return createNotificationDto;
    }

    async 알림을_저장한다(notificationDto: CreateNotificationDto, employeeIds: string[]): Promise<Notification> {
        const notification = await this.domainNotificationService.save(notificationDto);
        for (const employeeId of employeeIds) {
            await this.domainEmployeeNotificationService.save({
                employeeId,
                notificationId: notification.notificationId,
                isRead: false,
            });
        }
        return notification;
    }

    async 알림을_전송한다(tokens: string[], payload: PushNotificationPayload): Promise<BatchResponse> {
        return await this.fcmAdapter.sendBulkNotification(tokens, payload);
    }

    async 알림_전송_프로세스를_진행한다(
        notificationType: NotificationType,
        notificationData: CreateNotificationDataDto,
        targetEmployeeIds: string[],
    ) {
        // 알림에 들어갈 title과 body 생성
        const notificationContent = await this.알림_내용을_생성한다(notificationType, notificationData);
        // 알림데이터(Notification) 생성
        const notification = await this.알림을_저장한다(notificationContent, targetEmployeeIds);
        // 알림 전송을 위한 구독 정보 조회
        const tokens = await this.구독_목록을_조회한다(targetEmployeeIds);
        if (tokens.length === 0) {
            return;
        }
        // 실제 알림 전송
        await this.알림을_전송한다(tokens, {
            title: notification.title,
            body: notification.body,
            notificationType: notification.notificationType,
            notificationData: notification.notificationData,
        });
        // 알림 전송 후 전송상태 업데이트
        await this.domainNotificationService.setSentTrue([notification.notificationId]);
    }

    // ==================== Private Helper Functions ====================

    /**
     * 제목을 추출한다 (scheduleTitle 또는 reservationTitle 우선)
     */
    private _제목_추출(data: CreateNotificationDataDto): string {
        return data.schedule?.scheduleTitle || data.reservation?.reservationTitle || '제목 없음';
    }

    /**
     * 날짜를 추출한다 (기존 reservationDate 또는 startDate~endDate를 변형하여 생성)
     */
    private _날짜_추출(data: CreateNotificationDataDto): string {
        // 기존 reservation의 reservationDate가 있으면 사용
        if (data.reservation?.reservationDate) {
            return data.reservation.reservationDate;
        }
        // schedule의 startDate, endDate가 있으면 toAlarmRangeString으로 변형
        if (data.schedule?.startDate && data.schedule?.endDate) {
            return DateUtil.toAlarmRangeString(
                DateUtil.format(data.schedule.startDate),
                DateUtil.format(data.schedule.endDate),
            );
        }
        return '';
    }

    /**
     * 자원명을 추출한다
     */
    private _자원명_추출(data: CreateNotificationDataDto): string {
        return data.resource?.resourceName || '자원 정보 없음';
    }

    /**
     * 리마인더 알림을 생성한다 (기존 복잡한 시간 계산 로직 포함)
     */
    private async _생성_리마인더_알림(
        data: CreateNotificationDataDto,
    ): Promise<{ title: string; body: string; createdAt: string }> {
        const now = DateUtil.now().toDate();
        const diffInMilliseconds = DateUtil.parse(data.schedule.startDate).toDate().getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        const days = Math.floor(diffInMinutes / (24 * 60));
        const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
        const minutes = diffInMinutes % 60;
        const parts: string[] = [];
        if (diffInMilliseconds > 0) {
            switch (data.resource.resourceType) {
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
            switch (data.resource.resourceType) {
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
            title: `[${data.reservation.reservationTitle}]\n${timeDifferencePhrase}`,
            body: data.reservation.reservationDate,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };
    }
}
