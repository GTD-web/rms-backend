import { Injectable } from '@nestjs/common';
import { IResourceService } from '../../domain/interfaces/resource.interface';
import { ResourceRepository } from '../../infrastructure/repositories/resource.repository';
import { NotificationClientService } from '@lib/shared/modules/notification-client';
import { NotificationType } from '@lib/shared/interfaces/notification.interface';

@Injectable()
export class ResourceService implements IResourceService {
    constructor(
        private readonly resourceRepository: ResourceRepository,
        private readonly notificationClient: NotificationClientService,
    ) {}

    async allocateResource(resourceId: string, userId: string): Promise<void> {
        // 리소스 할당 로직
        await this.resourceRepository.allocate(resourceId);

        // 알림 전송
        await this.notificationClient.sendNotification({
            userId,
            title: '리소스 할당 완료',
            body: `리소스 ${resourceId}가 성공적으로 할당되었습니다.`,
            type: NotificationType.RESOURCE_ALLOCATED,
            data: {
                resourceId,
                action: 'allocated',
            },
        });
    }

    async releaseResource(resourceId: string, userId: string): Promise<void> {
        // 리소스 해제 로직
        await this.resourceRepository.release(resourceId);

        // 알림 전송
        await this.notificationClient.sendNotification({
            userId,
            title: '리소스 해제 완료',
            body: `리소스 ${resourceId}가 성공적으로 해제되었습니다.`,
            type: NotificationType.RESOURCE_RELEASED,
            data: {
                resourceId,
                action: 'released',
            },
        });
    }

    async approveResourceRequest(resourceId: string, userId: string): Promise<void> {
        // 리소스 승인 로직
        await this.resourceRepository.approve(resourceId);

        // 알림 전송
        await this.notificationClient.sendNotification({
            userId,
            title: '리소스 요청 승인',
            body: `리소스 ${resourceId} 요청이 승인되었습니다.`,
            type: NotificationType.SYSTEM_ALERT,
            data: {
                resourceId,
                action: 'approved',
            },
        });
    }
}
