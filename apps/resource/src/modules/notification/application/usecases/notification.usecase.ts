import { BadRequestException, Injectable } from '@nestjs/common';
import { AdapterService } from '../services/adapter.service';
import { NotificationService } from '../services/notification.service';
import { User } from '@libs/entities';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDatatDto, CreateNotificationDto } from '../dto/create-notification.dto';
import { DateUtil } from '@libs/utils/date.util';
import { EmployeeNotificationService } from '../services/employee-notification.service';
import { Notification } from '@libs/entities';
import { CronJob } from 'cron';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { NotificationDataDto, ResponseNotificationDto } from '../dto/response-notification.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LessThan, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class NotificationUsecase {
    constructor(
        private readonly adapterService: AdapterService,
        private readonly notificationService: NotificationService,
        private readonly employeeNotificationService: EmployeeNotificationService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async onModuleInit() {
        console.log('before module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
        const upcomingNotifications = await this.notificationService.findAll({
            where: { isSent: false },
            relations: ['employees'],
        });
        for (const notification of upcomingNotifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            await this.createReservationUpcomingNotification(notification, notiTarget);
        }
        const sentNotifications = await this.notificationService.findAll({
            where: { createdAt: MoreThanOrEqual(DateUtil.now().addDays(-3)) },
        });
        for (const notification of sentNotifications) {
            await this.markAsReadAfter3Days(notification);
        }
        console.log('after module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
    }

    async subscribe(user: User, subscription: PushNotificationSubscription): Promise<void> {
        this.eventEmitter.emit('update.user.subscription', {
            userId: user.userId,
            subscription: subscription,
        });
    }

    async unsubscribe(user: User): Promise<void> {
        this.eventEmitter.emit('update.user.subscription', {
            userId: user.userId,
            subscription: null,
        });
    }

    async markAsRead(employeeId: string, notificationId: string): Promise<void> {
        const employeeNotification = await this.employeeNotificationService.findOne({
            where: {
                employeeId,
                notificationId,
            },
        });
        if (!employeeNotification) {
            throw new BadRequestException('There is no data');
        }
        await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
            isRead: true,
        });
    }

    async findMyNotifications(
        employeeId: string,
        query?: PaginationQueryDto,
    ): Promise<PaginationData<ResponseNotificationDto>> {
        const options: RepositoryOptions = {
            where: {
                employees: { employeeId },
                isSent: true,
            },
        };
        const total = await this.notificationService.count({
            where: options.where,
        });

        if (query) {
            options.skip = query.getOffset();
            options.take = query.limit;
        }
        const notifications = await this.notificationService.findAll({
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
                    notificationData: notification.notificationData as NotificationDataDto,
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

    async createNotification(
        notificationType: NotificationType,
        createNotificationDatatDto: CreateNotificationDatatDto,
        notiTarget: string[],
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        const createNotificationDto: CreateNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: createNotificationDatatDto,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                createNotificationDto.title = `예약 시간이 ${createNotificationDatatDto.beforeMinutes}분 남았습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                createNotificationDto.createdAt = DateUtil.parse(createNotificationDatatDto.reservationDate)
                    .addMinutes(-createNotificationDatatDto.beforeMinutes)
                    .format('YYYY-MM-DD HH:mm');
                createNotificationDto.isSent = false;
                break;
            case NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_TIME_CHANGED:
                createNotificationDto.title = `[예약 시간 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case NotificationType.RESOURCE_MAINTENANCE_COMPLETED:
                createNotificationDto.title = `[정비 완료] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
        }

        const notification = await this.notificationProcess(createNotificationDto, notiTarget, repositoryOptions);

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                this.createReservationUpcomingNotification(notification, notiTarget);
                break;
            case NotificationType.RESERVATION_TIME_CHANGED:
                const notis = await this.notificationService.findAll({
                    where: {
                        notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
                        notificationData: { reservationId: createNotificationDatatDto.reservationId },
                        isSent: false,
                    },
                });

                for (const noti of notis) {
                    this.deleteReservationUpcomingNotification(noti);
                    await this.notificationService.delete(noti.notificationId);
                }

            default:
                for (const employeeId of notiTarget) {
                    try {
                        await this.adapterService.send(employeeId, notification);
                    } catch (error) {
                        console.error(`Failed to send notification to employee ${employeeId}: ${error}`);
                    }
                }
                break;
        }
        await this.markAsReadAfter3Days(notification);
    }

    private async notificationProcess(
        createNotificationDto: CreateNotificationDto,
        notiTarget: string[],
        repositoryOptions?: RepositoryOptions,
    ) {
        const notification = await this.notificationService.save(createNotificationDto, repositoryOptions);
        // employee 와 연결 필요
        for (const employeeId of notiTarget) {
            const employeeNotification = await this.employeeNotificationService.save(
                {
                    employeeId: employeeId,
                    notificationId: notification.notificationId,
                },
                repositoryOptions,
            );
        }
        return notification;
    }

    private async deleteReservationUpcomingNotification(notification: Notification) {
        const jobName = `upcoming-${notification.notificationId}-${DateUtil.date(notification.createdAt).format('YYYYMMDDHHmm')}`;
        this.schedulerRegistry.deleteCronJob(jobName);
    }

    private async createReservationUpcomingNotification(
        notification: Notification,
        notiTarget: string[],
    ): Promise<void> {
        const jobName = `upcoming-${notification.notificationId}-${DateUtil.now().format('YYYYMMDDHHmm')}`;
        const notificationDate = new Date(notification.createdAt);

        // 과거 시간 체크
        if (notificationDate.getTime() <= Date.now()) {
            console.log(`Notification time ${notificationDate} is in the past, skipping cron job creation`);
            return;
        }

        const job = new CronJob(notificationDate, async () => {
            for (const employeeId of notiTarget) {
                try {
                    await this.adapterService.send(employeeId, notification);
                } catch (error) {
                    console.error(`Failed to send notification to employee ${employeeId}: ${error}`);
                } finally {
                    await this.notificationService.update(notification.notificationId, { isSent: true });
                }
            }
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        console.log(Array.from(this.schedulerRegistry.getCronJobs().keys()));
        job.start();
    }

    async markAsReadAfter3Days(notification: Notification): Promise<void> {
        const parsedDate = DateUtil.parse(notification.createdAt).addDays(3).toDate();
        const notificationDate = new Date(parsedDate);
        const jobName = `mark-as-read-${notification.notificationId}-${DateUtil.now().format('YYYYMMDDHHmmssSSS')}`;
        const job = new CronJob(notificationDate, async () => {
            const employeeNotifications = await this.employeeNotificationService.findAll({
                where: { notificationId: notification.notificationId },
            });
            for (const employeeNotification of employeeNotifications) {
                await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
                    isRead: true,
                });
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job as any);
        job.start();
    }

    async sendTestNotification(employeeId: string, payload: any) {
        await this.adapterService.send(employeeId, payload);
    }
}
