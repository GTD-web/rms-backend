import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdapterService } from '../services/adapter.service';
import { NotificationService } from '../services/notification.service';
import { User } from '@libs/entities';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDatatDto, CreateNotificationDto } from '../dto/create-notification.dto';
import { DateUtil } from '@libs/utils/date.util';
import { EmployeeNotificationService } from '../services/employee-notification.service';
import { Notification } from '@libs/entities';
import { CronJob } from 'cron';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ResponseNotificationDto } from '../dto/response-notification.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';

@Injectable()
export class NotificationUsecase {
    constructor(
        private readonly adapterService: AdapterService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
        private readonly employeeNotificationService: EmployeeNotificationService,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {}

    async onModuleInit() {
        console.log('before module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
        const notifications = await this.notificationService.findAll({
            where: { isSent: false },
            relations: ['employees'],
        });
        for (const notification of notifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            await this.createReservationUpcomingNotification(notification, notiTarget);
        }
        console.log('after module init', Array.from(this.schedulerRegistry.getCronJobs().keys()));
    }

    async subscribe(user: User, subscription: PushNotificationSubscription): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(subscription);
        await this.userService.update(userDomain);
    }

    async unsubscribe(user: User): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(null);
        await this.userService.update(userDomain);
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

    async findMyNotifications(employeeId: string): Promise<ResponseNotificationDto[]> {
        const notifications = await this.notificationService.findAll({
            where: {
                employees: { employeeId },
                isSent: true,
            },
            relations: ['employees'],
        });
        return notifications.map((notification) => {
            return {
                notificationId: notification.notificationId,
                title: notification.title,
                body: notification.body,
                notificationData: notification.notificationData,
                notificationType: notification.notificationType,
                createdAt: notification.createdAt,
                isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
            };
        });
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
            case NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
        }

        const notification = await this.notificationProcess(createNotificationDto, notiTarget, repositoryOptions);

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                this.createReservationUpcomingNotification(notification, notiTarget);
                break;
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

    private async createReservationUpcomingNotification(
        notification: Notification,
        notiTarget: string[],
    ): Promise<void> {
        const jobName = `upcoming-${notification.notificationId}-${DateUtil.now().format('YYYYMMDDHHmmssSSS')}`;
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

    async sendTestNotification(user: User, payload: any) {
        await this.adapterService.sendTestNotification(user, payload);
    }
}
