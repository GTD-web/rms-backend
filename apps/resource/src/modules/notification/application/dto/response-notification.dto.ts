import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationData } from '@libs/entities/notification.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class NotificationDataDto implements NotificationData {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceName?: string;

    @ApiProperty({ enum: ResourceType, required: false })
    @IsEnum(ResourceType)
    @IsOptional()
    resourceType?: ResourceType;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    consumableName?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    reservationId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    reservationTitle?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    reservationDate?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    beforeMinutes?: number;
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
