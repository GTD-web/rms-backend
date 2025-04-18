import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { NotificationRepository } from './infrastructure/adapters/out/persistence/notification.repository';
import { NotificationController } from './infrastructure/adapters/in/web/controllers/notification.controller';
import { NotificationService } from './application/services/notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WEB_PUSH_CONFIG, FIREBASE_CONFIG } from '@libs/configs/env.config';
import { AdapterService } from './application/services/adapter.service';
import { WebPushAdapter } from './infrastructure/adapters/out/device/web-push.adapter';
import { AuthModule } from '@resource/modules/auth/auth.module';
import { NotificationUsecase } from './application/usecases/notification.usecase';
import { FCMAdapter } from './infrastructure/adapters/out/device/fcm-push.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeeNotificationService } from './application/services/employee-notification.service';
import { EmployeeNotificationRepository } from './infrastructure/adapters/out/persistence/employee-notification.repository';
import { EmployeeNotification } from '@libs/entities';
import { NotificationEventHandler } from './application/handler/notification-event.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification, EmployeeNotification]),
        ConfigModule.forFeature(WEB_PUSH_CONFIG),
        ConfigModule.forFeature(FIREBASE_CONFIG),
        ScheduleModule.forRoot(),
        AuthModule,
    ],
    providers: [
        ConfigService,
        NotificationService,
        AdapterService,
        EmployeeNotificationService,
        NotificationUsecase,
        {
            provide: 'NotificationRepositoryPort',
            useClass: NotificationRepository,
        },
        {
            provide: 'EmployeeNotificationRepositoryPort',
            useClass: EmployeeNotificationRepository,
        },
        {
            provide: 'PushNotificationServicePort',
            // useClass: WebPushAdapter,
            useClass: FCMAdapter,
        },
        NotificationEventHandler,
    ],
    controllers: [NotificationController],
    exports: [
        NotificationService,
        AdapterService,
        EmployeeNotificationService,
        NotificationUsecase,
        {
            provide: 'NotificationRepositoryPort',
            useClass: NotificationRepository,
        },
        {
            provide: 'EmployeeNotificationRepositoryPort',
            useClass: EmployeeNotificationRepository,
        },
        {
            provide: 'PushNotificationServicePort',
            // useClass: WebPushAdapter,
            useClass: FCMAdapter,
        },
    ],
})
export class NotificationModule {}
