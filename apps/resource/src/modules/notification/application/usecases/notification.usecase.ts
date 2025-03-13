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
        CreateNotificationContentDto: CreateNotificationContentDto,
        employeeId: string,
    ): Promise<void> {
        let notification: Notification;

        switch (notificationType) {
            case NotificationType.RESERVATION_REMINDER:
                await this.createReservationUpcomingNotification(CreateNotificationContentDto, employeeId);
                return;
            case NotificationType.RESERVATION_CREATED:
                notification = await this.createReservationConfirmedNotification(CreateNotificationContentDto);
                break;
            case NotificationType.RESERVATION_REJECTED:
                notification = await this.createReservationCancelledNotification(CreateNotificationContentDto);
                break;
            case NotificationType.RESERVATION_CANCELLED:
                notification = await this.createReservationRejectedNotification(CreateNotificationContentDto);
                break;
            case NotificationType.PARTICIPANT_CHANGED:
                notification = await this.createParticipantChangedNotification(CreateNotificationContentDto);
                break;
            case NotificationType.CONSUMABLE_CHANGING:
                notification = await this.createSuppliesReplacementNotification(CreateNotificationContentDto);
                break;
        }
    }

    private async notificationProcess(
        notificationType: NotificationType,
        createNotificationDto: CreateNotificationDto,
        employeeId: string,
    ) {
        const notification = await this.notificationService.save(createNotificationDto);
        // employee 와 연결 필요
        const employeeNotification = await this.employeeNotificationService.save({
            employeeId: employeeId,
            notificationId: notification.notificationId,
        });

        await this.adapterService.send();
    }

    private async createReservationConfirmedNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
    ): Promise<Notification> {
        const createNotificationDto = {
            title: `[예약 확정] ${CreateNotificationContentDto.reservationTitle}`,
            body: `${CreateNotificationContentDto.reservationDate}`,
            notificationType: NotificationType.RESERVATION_CREATED,
            resourceName: CreateNotificationContentDto.resourceName,
            reservationDate: CreateNotificationContentDto.reservationDate,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };

        return await this.notificationService.save(createNotificationDto);
    }

    private async createReservationCancelledNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
    ): Promise<Notification> {
        const createNotificationDto = {
            title: `[예약 취소] ${CreateNotificationContentDto.reservationTitle}`,
            body: `${CreateNotificationContentDto.reservationDate}`,
            notificationType: NotificationType.RESERVATION_CANCELLED,
            resourceName: CreateNotificationContentDto.resourceName,
            reservationDate: CreateNotificationContentDto.reservationDate,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };
        return await this.notificationService.save(createNotificationDto);
    }

    private async createReservationRejectedNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
    ): Promise<Notification> {
        const createNotificationDto = {
            title: `[예약 거절] ${CreateNotificationContentDto.reservationTitle}`,
            body: `${CreateNotificationContentDto.reservationDate}`,
            notificationType: NotificationType.RESERVATION_REJECTED,
            resourceName: CreateNotificationContentDto.resourceName,
            reservationDate: CreateNotificationContentDto.reservationDate,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };
        return await this.notificationService.save(createNotificationDto);
    }

    private async createReservationUpcomingNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
        employeeId: string,
    ): Promise<void> {
        const jobName = `upcoming-${CreateNotificationContentDto.reservationTitle}`;
        const date = new Date(CreateNotificationContentDto.reservationDate);
        date.setMinutes(date.getMinutes() - CreateNotificationContentDto.beforeMinutes);

        const job = new CronJob(date, async () => {
            const createNotificationDto = {
                title: `예약 시간이 ${CreateNotificationContentDto.beforeMinutes}분 남았습니다.`,
                body: `${CreateNotificationContentDto.resourceName}`,
                notificationType: NotificationType.RESERVATION_REMINDER,
                resourceName: CreateNotificationContentDto.resourceName,
                reservationDate: CreateNotificationContentDto.reservationDate,
                createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
            };

            const notification = await this.notificationService.save(createNotificationDto);

            await this.employeeNotificationService.save({
                employeeId: employeeId,
                notificationId: notification.notificationId,
            });

            await this.adapterService.send();
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        job.start();
    }

    private async createParticipantChangedNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
    ): Promise<Notification> {
        const createNotificationDto = {
            title: `[참가자 변경] ${CreateNotificationContentDto.reservationTitle}`,
            body: `${CreateNotificationContentDto.reservationDate}`,
            notificationType: NotificationType.PARTICIPANT_CHANGED,
            resourceName: CreateNotificationContentDto.resourceName,
            reservationDate: CreateNotificationContentDto.reservationDate,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };
        return await this.notificationService.save(createNotificationDto);
    }

    private async createSuppliesReplacementNotification(
        CreateNotificationContentDto: CreateNotificationContentDto,
    ): Promise<Notification> {
        const createNotificationDto = {
            title: `[교체 주기 알림] ${CreateNotificationContentDto.consumableName}`,
            body: `${CreateNotificationContentDto.resourceName}`,
            notificationType: NotificationType.CONSUMABLE_CHANGING,
            resourceName: CreateNotificationContentDto.resourceName,
            createdAt: DateUtil.now().format('YYYY-MM-DD HH:mm'),
        };
        return await this.notificationService.save(createNotificationDto);
    }
}
