import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeNotification, Notification } from '@libs/entities';
import { DomainNotificationModule } from '@src/domain/notification/notification.module';
import { DomainEmployeeNotificationModule } from '@src/domain/employee-notification/employee-notification.module';
import { NotificationService } from '@src/application/notification/notification.service';
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
} from './usecases';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { FIREBASE_CONFIG } from '@libs/configs/env.config';

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
    ],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
