import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeNotification, Notification, Reservation } from '@libs/entities';
import { DomainNotificationModule } from '@src/domain/notification/notification.module';
import { DomainEmployeeNotificationModule } from '@src/domain/employee-notification/employee-notification.module';
import { NotificationContextService } from './services/notification.context.service';
import { NotificationController } from './controllers/notification.controller';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { FIREBASE_CONFIG } from '@libs/configs/env.config';
import { CronNotificationController } from './controllers/cron.notification.controller';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { AdminNotificationController } from './controllers/admin.notification.controller';
import { FCMAdapter } from './adapter/fcm-push.adapter';
import { CronNotificationContextService } from './services/cron-notification.context.service';

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
    controllers: [NotificationController, CronNotificationController, AdminNotificationController],
    providers: [NotificationContextService, CronNotificationContextService, FCMAdapter],
    exports: [NotificationContextService],
})
export class NotificationContextModule {}
