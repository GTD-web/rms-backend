import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Notification])],
    providers: [NotificationService, NotificationRepository],
    exports: [NotificationService],
})
export class NotificationModule {}
