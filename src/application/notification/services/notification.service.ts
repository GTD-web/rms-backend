import { Injectable } from '@nestjs/common';
import { SubscribeUsecase } from '../usecases/subscribe.usecase';
import { Employee, Notification } from '@libs/entities';
import { PushNotificationPayload } from '@src/application/notification/dtos/send-notification.dto';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
import { SendMultiNotificationUsecase } from '../usecases/sendMultiNotification.usecase';
import { ResponseNotificationDto } from '@src/application/notification/dtos/response-notification.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { GetMyNotificationUsecase } from '../usecases/getMyNotification.usecase';
import { MarkAsReadUsecase } from '../usecases/markAsRead.usecase';
import { CreateNotificationUsecase } from '../usecases/createNotification.usecase';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { SaveNotificationUsecase } from '../usecases/saveNotification.usecase';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { CreateScheduleJobUsecase } from '../usecases/createScheduleJob.usecase';
import { GetSubscriptionsUsecase } from '../usecases/getSubscriptions.usecase';
import { DeleteScheduleJobUsecase } from '../usecases/deleteScheduleJob.usecase';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { GetSubscriptionInfoUsecase } from '../usecases/getSubscriptionInfo.usecase';
import { CreateReminderNotificationUsecase } from '../usecases/createReminderNotification.usecase';

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
        private readonly getSubscriptionInfoUsecase: GetSubscriptionInfoUsecase,
        private readonly createReminderNotificationUsecase: CreateReminderNotificationUsecase,
    ) {}

    async onModuleInit() {
        // const upcomingNotifications = await this.notificationService.findAll({
        //     where: { isSent: false },
        //     relations: ['employees'],
        // });
        // for (const notification of upcomingNotifications) {
        //     const notiTarget = notification.employees.map((employee) => employee.employeeId);
        //     const subscriptions: PushSubscriptionDto[] = [];
        //     for (const employeeId of notiTarget) {
        //         const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
        //         subscriptions.push(...subscriptions);
        //     }
        //     await this.createScheduleJobUsecase.execute(notification, subscriptions);
        // }
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

    async findSubscription(token?: string, employeeId?: string) {
        if (!token && !employeeId) {
            return null;
        }

        if (employeeId) {
            const subscriptions = await this.getSubscriptionInfoUsecase.executeByEmployeeId(employeeId);
            return subscriptions;
        }

        // employeeId가 없는 경우, 토큰으로만 검색
        // 토큰이 일치하는 구독 정보를 찾기 위해 모든 직원의 구독 정보를 검색
        const subscriptions = await this.getSubscriptionInfoUsecase.executeByToken(token);
        return subscriptions;
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

        const totalSubscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
            totalSubscriptions.push(...subscriptions);
        }

        switch (notificationType) {
            case NotificationType.RESERVATION_DATE_UPCOMING:
                // this.createScheduleJobUsecase.execute(notification, totalSubscriptions);
                break;
            // case NotificationType.RESERVATION_TIME_CHANGED:
            //     this.deleteScheduleJobUsecase.execute(createNotificationDatatDto);
            default:
                await this.sendMultiNotificationUsecase.execute(totalSubscriptions, {
                    title: notification.title,
                    body: notification.body,
                    notificationType: notification.notificationType,
                    notificationData: notification.notificationData,
                });
                break;
        }
    }

    async sendReminderNotification(
        notificationType: NotificationType,
        createNotificationDatatDto: CreateNotificationDataDto,
        notiTarget: string[],
    ): Promise<void> {
        const createNotificationDto = await this.createReminderNotificationUsecase.execute(createNotificationDatatDto);

        if (!createNotificationDto) {
            return;
        }

        const notification = await this.saveNotificationUsecase.execute(createNotificationDto, notiTarget);

        const totalSubscriptions: PushSubscriptionDto[] = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
            totalSubscriptions.push(...subscriptions);
        }

        await this.sendMultiNotificationUsecase.execute(totalSubscriptions, {
            title: notification.title,
            body: notification.body,
            notificationType: notification.notificationType,
            notificationData: notification.notificationData,
        });
    }
}
