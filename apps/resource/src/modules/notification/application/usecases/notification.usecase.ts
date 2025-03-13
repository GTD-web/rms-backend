import { Injectable, NotFoundException } from '@nestjs/common';
import { AdapterService } from '../services/adapter.service';
import { NotificationService } from '../services/notification.service';
import { User } from '@libs/entities';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationContentDto, CreateNotificationDto } from '../dto/create-notification.dto';
import { DateUtil } from '@libs/utils/date.util';
import { EmployeeNotificationService } from '../services/employee-notification.service';
import { Notification } from '@libs/entities';
import { CronJob } from 'cron';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class NotificationUsecase {
    constructor(
        private readonly adapterService: AdapterService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
        private readonly employeeNotificationService: EmployeeNotificationService,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {}

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

    async createNotification(
        notificationType: NotificationType,
        createNotificationContentDto: CreateNotificationContentDto,
        notiTarget: string[],
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        let createNotificationDto: CreateNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            reservationDate: createNotificationContentDto.reservationDate,
            resourceName: createNotificationContentDto.resourceName,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };

        switch (notificationType) {
            case NotificationType.RESERVATION_REMINDER:
                this.createReservationUpcomingNotification(createNotificationContentDto, notiTarget);
                return;
            case NotificationType.RESERVATION_CREATED:
                createNotificationDto.title = `[예약 확정] ${createNotificationContentDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationContentDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_REJECTED:
                createNotificationDto.title = `[예약 거절] ${createNotificationContentDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationContentDto.reservationDate}`;
                break;
            case NotificationType.RESERVATION_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationContentDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationContentDto.reservationDate}`;
                break;
            case NotificationType.PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationContentDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationContentDto.reservationDate}`;
                break;
            case NotificationType.CONSUMABLE_CHANGING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationContentDto.consumableName}`;
                createNotificationDto.body = `${createNotificationContentDto.resourceName}`;
                break;
        }

        await this.notificationProcess(createNotificationDto, notiTarget, repositoryOptions);
    }

    private async notificationProcess(
        createNotificationDto: CreateNotificationDto,
        notiTarget: string[],
        repositoryOptions?: RepositoryOptions,
    ) {
        const notification = await this.notificationService.save(createNotificationDto, repositoryOptions);
        console.log(notification);
        // employee 와 연결 필요
        for (const employeeId of notiTarget) {
            const employeeNotification = await this.employeeNotificationService.save(
                {
                    employeeId: employeeId,
                    notificationId: notification.notificationId,
                },
                repositoryOptions,
            );
            console.log(employeeNotification);
            await this.adapterService.send(employeeId, notification);
        }
    }

    private async createReservationUpcomingNotification(
        createNotificationContentDto: CreateNotificationContentDto,
        notiTarget: string[],
    ): Promise<void> {
        const jobName = `upcoming-${DateUtil.now().format('YYYYMMDDHHmmssSSS')}-${createNotificationContentDto.beforeMinutes}`;
        const notificationDate = new Date(createNotificationContentDto.reservationDate);
        notificationDate.setMinutes(notificationDate.getMinutes() - createNotificationContentDto.beforeMinutes);

        // 과거 시간 체크
        if (notificationDate.getTime() <= Date.now()) {
            console.log(`Notification time ${notificationDate} is in the past, skipping cron job creation`);
            return;
        }

        const job = new CronJob(notificationDate, async () => {
            const createNotificationDto = {
                title: `예약 시간이 ${createNotificationContentDto.beforeMinutes}분 남았습니다.`,
                body: `${createNotificationContentDto.resourceName}`,
                notificationType: NotificationType.RESERVATION_REMINDER,
                reservationDate: createNotificationContentDto.reservationDate,
                resourceName: createNotificationContentDto.resourceName,
                createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            };
            await this.notificationProcess(createNotificationDto, notiTarget);
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        console.log(Array.from(this.schedulerRegistry.getCronJobs().keys()));
        job.start();
    }
}
