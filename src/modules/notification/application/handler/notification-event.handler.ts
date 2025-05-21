import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { NotificationUsecase } from '../usecases/notification.usecase';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDatatDto } from '../dto/create-notification.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class NotificationEventHandler {
    constructor(private readonly notificationUsecase: NotificationUsecase) {}
    // 이벤트 수신 예시 메서드
    @OnEvent('create.notification')
    async handleCreateNotificationEvent(payload: {
        notificationType: NotificationType;
        notificationData: CreateNotificationDatatDto;
        notiTarget: string[];
        repositoryOptions?: RepositoryOptions;
    }) {
        await this.notificationUsecase.createNotification(
            payload.notificationType,
            payload.notificationData,
            payload.notiTarget,
            payload.repositoryOptions,
        );
    }
}
