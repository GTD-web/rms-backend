import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeNotification, Notification, Reservation } from '@libs/entities';
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
    CreateReminderNotificationUsecase,
} from './usecases';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { FIREBASE_CONFIG } from '@libs/configs/env.config';
import { CronNotificationController } from './controllers/cron.notification.controller';
import { CronNotificationService } from './services/cron-notification.service';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { AdminNotificationController } from './controllers/admin.notification.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee, Notification, EmployeeNotification, Reservation]),
        ConfigModule.forFeature(FIREBASE_CONFIG),
        ScheduleModule.forRoot(),
        DomainEmployeeModule,
        DomainEmployeeNotificationModule,
        DomainNotificationModule,
        DomainReservationModule,
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
        CreateReminderNotificationUsecase,
    ],
    controllers: [NotificationController, CronNotificationController, AdminNotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
