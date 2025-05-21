import { NotificationData } from '@libs/entities/notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDatatDto implements NotificationData {
    @ApiProperty({ required: false, description: '예약 ID, 예약 알림 시 필수' })
    reservationId?: string;

    @ApiProperty({ required: false, description: '예약 제목, 예약 알림 시 필수' })
    reservationTitle?: string;

    @ApiProperty({ required: false, description: '예약 날짜, 예약 알림 시 필수' })
    reservationDate?: string;

    @ApiProperty({ required: false, description: '예약 시작 전 분 수, 예약 시간 알림 시 필수' })
    beforeMinutes?: number;

    @ApiProperty({ required: false, description: '자원 ID, 자원 알림 시 필수' })
    resourceId?: string;

    @ApiProperty({ required: true, description: '자원 이름' })
    resourceName: string;

    @ApiProperty({ enum: ResourceType, required: true, description: '자원 타입' })
    resourceType: ResourceType;

    @ApiProperty({ required: false, description: '소모품 이름, 소모품 알림 시 필수' })
    consumableName?: string;
}

export class CreateNotificationDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    notificationData: CreateNotificationDatatDto;

    @ApiProperty()
    createdAt?: string;

    @ApiProperty()
    isSent?: boolean;

    @ApiProperty({ enum: NotificationType })
    notificationType: NotificationType;
}

export class CreateEmployeeNotificationDto {
    @ApiProperty()
    employeeId: string;

    @ApiProperty()
    notificationId: string;
}

export class SendNotificationDto {
    @ApiProperty({ enum: NotificationType })
    notificationType: NotificationType;

    @ApiProperty()
    notificationData: CreateNotificationDatatDto;

    @ApiProperty({
        example: ['1256124-ef14-4124-9124-124124124124'],
        description: '알림 수신자 목록 (employeeId)',
    })
    notificationTarget: string[];
}
