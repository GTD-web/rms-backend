import { NotificationType } from '@libs/enums/notification-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationContentDto {
    @ApiProperty()
    resourceName: string;

    @ApiProperty()
    reservationTitle: string;

    @ApiProperty()
    reservationDate: string;

    @ApiProperty()
    beforeMinutes?: number;

    @ApiProperty()
    consumableName?: string;
}

export class CreateNotificationDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    resourceName: string;

    @ApiProperty()
    reservationDate?: string;

    @ApiProperty()
    createdAt?: string;

    @ApiProperty()
    notificationType: NotificationType;
}

export class CreateEmployeeNotificationDto {
    @ApiProperty()
    employeeId: string;

    @ApiProperty()
    notificationId: string;
}
