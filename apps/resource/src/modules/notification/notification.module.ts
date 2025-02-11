import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './domain/entities/notification.entity';
import { PushSubscription } from './domain/entities/push-subscription.entity';
import { NotificationService } from './application/services/notification.service';
import { NotificationController } from './presentation/controllers/notification.controller';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { PushSubscriptionRepository } from './infrastructure/repositories/push-subscription.repository';
import { WebPushAdapter } from './infrastructure/adapters/web-push.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, PushSubscription])],
    controllers: [NotificationController],
    providers: [NotificationService, NotificationRepository, PushSubscriptionRepository, WebPushAdapter],
    exports: [NotificationService],
})
export class NotificationModule {}
