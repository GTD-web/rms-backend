import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationData } from '@libs/entities/notification.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';

export class NotificationDataDto implements NotificationData {
    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    resourceName: string;

    @ApiProperty()
    resourceType: ResourceType;

    @ApiProperty()
    consumableName: string;

    @ApiProperty()
    reservationId: string;

    @ApiProperty()
    reservationTitle: string;

    @ApiProperty()
    reservationDate: string;

    @ApiProperty()
    beforeMinutes: number;
}

export class ResponseNotificationDto {
    @ApiProperty()
    notificationId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty({ type: NotificationDataDto })
    notificationData: NotificationDataDto;

    @ApiProperty()
    createdAt: string;

    @ApiProperty({ enum: NotificationType })
    notificationType: NotificationType;

    @ApiProperty()
    isRead: boolean;
}
