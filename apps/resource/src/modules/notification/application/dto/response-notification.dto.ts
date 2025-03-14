import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationData } from '@libs/entities/notification.entity';
export class ResponseNotificationDto {
    @ApiProperty()
    notificationId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    notificationData: NotificationData;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    notificationType: NotificationType;

    @ApiProperty()
    isRead: boolean;
}
