import { Injectable } from '@nestjs/common';
import { SubscribeUsecase } from './usecases/subscribe.usecase';
import { Employee, Notification } from '@libs/entities';
import { PushNotificationPayload } from '@src/modules/notification/application/dto/send-notification.dto';
import { PushSubscriptionDto } from '@src/modules/notification/application/dto/push-subscription.dto';
import { SendMultiNotificationUsecase } from './usecases/sendMultiNotification.usecase';
import { ResponseNotificationDto } from '@src/modules/notification/application/dto/response-notification.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { GetMyNotificationUsecase } from './usecases/getMyNotification.usecase';
import { MarkAsReadUsecase } from './usecases/markAsRead.usecase';
import { CreateNotificationUsecase } from './usecases/createNotification.usecase';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { SaveNotificationUsecase } from './usecases/saveNotification.usecase';
import { CreateNotificationDataDto } from './dtos/create-notification.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { CreateScheduleJobUsecase } from './usecases/createScheduleJob.usecase';
import { GetSubscriptionsUsecase } from './usecases/getSubscriptions.usecase';
import { DeleteScheduleJobUsecase } from './usecases/deleteScheduleJob.usecase';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class NotificationService {
    constructor(
        private readonly subscribeUsecase: SubscribeUsecase,
        private readonly sendMultiNotificationUsecase: SendMultiNotificationUsecase,
        private readonly getMyNotificationUsecase: GetMyNotificationUsecase,
        private readonly markAsReadUsecase: MarkAsReadUsecase,
        private readonly createNotificationUsecase: CreateNotificationUsecase,
        private readonly saveNotificationUsecase: SaveNotificationUsecase,
        private readonly createScheduleJobUsecase: CreateScheduleJobUsecase,
        private readonly getSubscriptionsUsecase: GetSubscriptionsUsecase,
        private readonly deleteScheduleJobUsecase: DeleteScheduleJobUsecase,
        private readonly notificationService: DomainNotificationService,
    ) {}

    async onModuleInit() {
        const upcomingNotifications = await this.notificationService.findAll({
            where: { isSent: false },
            relations: ['employees'],
        });

        for (const notification of upcomingNotifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            const subscriptions: PushSubscriptionDto[] = [];
            for (const employeeId of notiTarget) {
                const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
                subscriptions.push(...subscriptions);
            }
            await this.createScheduleJobUsecase.execute(notification, subscriptions);
        }
    }

    async subscribe(user: Employee, subscription: PushSubscriptionDto): Promise<void> {
        await this.subscribeUsecase.execute(user.employeeId, subscription);
    }

    async sendDirectNotification(subscription: PushSubscriptionDto, payload: PushNotificationPayload): Promise<void> {
        await this.sendMultiNotificationUsecase.execute([subscription], payload);
    }

    async findMyNotifications(
        employeeId: string,
        query?: PaginationQueryDto,
    ): Promise<PaginationData<ResponseNotificationDto>> {
        return await this.getMyNotificationUsecase.execute(employeeId, query);
    }

    async markAsRead(employeeId: string, notificationId: string): Promise<void> {
        return await this.markAsReadUsecase.execute(employeeId, notificationId);
    }

    async createNotification(
        notificationType: NotificationType,
        createNotificationDatatDto: CreateNotificationDataDto,
        notiTarget: string[],
        repositoryOptions?: IRepositoryOptions<Notification>,
    ): Promise<void> {
        notiTarget = Array.from(new Set(notiTarget));

        const notificationDto = await this.createNotificationUsecase.execute(
            notificationType,
            createNotificationDatatDto,
        );
        const notification = await this.saveNotificationUsecase.execute(notificationDto, notiTarget, repositoryOptions);

        const subscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
            subscriptions.push(...subscriptions);
        }
        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                this.createScheduleJobUsecase.execute(notification, subscriptions);
                break;
            case NotificationType.RESERVATION_TIME_CHANGED:
                this.deleteScheduleJobUsecase.execute(createNotificationDatatDto);
            default:
                this.sendMultiNotificationUsecase.execute(subscriptions, {
                    title: notification.title,
                    body: notification.body,
                });
                break;
        }
        // await this.markAsReadAfter3Days(notification);
    }

    // async markAsReadAfter3Days(notification: Notification): Promise<void> {
    //     const parsedDate = DateUtil.parse(notification.createdAt).addDays(3).toDate();
    //     const notificationDate = new Date(parsedDate);
    //     const jobName = `mark-as-read-${notification.notificationId}-${DateUtil.now().format('YYYYMMDDHHmmssSSS')}`;
    //     const job = new CronJob(notificationDate, async () => {
    //         const employeeNotifications = await this.employeeNotificationService.findAll({
    //             where: { notificationId: notification.notificationId },
    //         });
    //         for (const employeeNotification of employeeNotifications) {
    //             await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
    //                 isRead: true,
    //             });
    //         }
    //     });
    //     this.schedulerRegistry.addCronJob(jobName, job as any);
    //     job.start();
    // }
}
