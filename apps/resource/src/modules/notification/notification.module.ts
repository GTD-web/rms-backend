import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { NotificationRepository } from './infrastructure/adapters/out/persistence/notification.repository';
import { NotificationController } from './infrastructure/adapters/in/web/controllers/notification.controller';
import { NotificationService } from './application/services/notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WEB_PUSH_CONFIG } from '@libs/configs/env.config';
import { AdapterService } from './application/services/adapter.service';
import { WebPushAdapter } from './infrastructure/adapters/out/device/web-push.adapter';
// import { FCMAdapter } from "./infrastructure/adapters/out/device/fcm-push.adapter";

@Module({
    imports: [TypeOrmModule.forFeature([Notification]), ConfigModule.forFeature(WEB_PUSH_CONFIG)],
    providers: [
        ConfigService,
        NotificationService,
        AdapterService,
        {
            provide: 'NotificationRepositoryPort',
            useClass: NotificationRepository,
        },
        {
            provide: 'PushNotificationServicePort',
            useClass: WebPushAdapter,
        },
    ],
    controllers: [NotificationController],
    exports: [
        NotificationService,
        AdapterService,
        {
            provide: 'NotificationRepositoryPort',
            useClass: NotificationRepository,
        },
        {
            provide: 'PushNotificationServicePort',
            useClass: WebPushAdapter,
        },
    ],
})
export class NotificationModule {}
