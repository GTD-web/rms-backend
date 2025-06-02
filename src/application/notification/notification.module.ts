import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeNotification, Notification } from '@libs/entities';
import { DomainNotificationModule } from '@src/domain/notification/notification.module';
import { DomainEmployeeNotificationModule } from '@src/domain/employee-notification/employee-notification.module';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { NotificationController } from '@src/application/notification/controllers/notification.controller';
import { FCMAdapter } from '@src/application/notification/infrastructure/fcm-push.adapter';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import {
    SubscribeUsecase,
    SendMultiNotificationUsecase,
    GetMyNotificationUsecase,
    MarkAsReadUsecase,
    SaveNotificationUsecase,
    CreateNotificationUsecase,
    CreateScheduleJobUsecase,
    GetSubscriptionsUsecase,
    DeleteScheduleJobUsecase,
    GetSubscriptionInfoUsecase,
    CronSendUpcomingNotificationUsecase,
} from './usecases';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { FIREBASE_CONFIG } from '@libs/configs/env.config';
import { CronNotificationController } from './controllers/cron.notification.controller';
import { CronNotificationService } from './services/cron-notification.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee, Notification, EmployeeNotification]),
        ConfigModule.forFeature(FIREBASE_CONFIG),
        ScheduleModule.forRoot(),
        DomainEmployeeModule,
        DomainEmployeeNotificationModule,
        DomainNotificationModule,
    ],
    providers: [
        NotificationService,
        CronNotificationService,
        FCMAdapter,
        SubscribeUsecase,
        SendMultiNotificationUsecase,
        GetMyNotificationUsecase,
        MarkAsReadUsecase,
        SaveNotificationUsecase,
        CreateNotificationUsecase,
        CreateScheduleJobUsecase,
        GetSubscriptionsUsecase,
        DeleteScheduleJobUsecase,
        GetSubscriptionInfoUsecase,
        CronSendUpcomingNotificationUsecase,
    ],
    controllers: [NotificationController, CronNotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
