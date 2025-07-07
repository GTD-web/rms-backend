import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { Public } from '@libs/decorators/public.decorator';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';

import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { ResponseNotificationDto } from '../dtos/response-notification.dto';
import { SendNotificationDto } from '../dtos/create-notification.dto';
import { PushNotificationDto } from '../dtos/send-notification.dto';

import { NotificationService } from '../services/notification.service';

@ApiTags('5. 알림 - 관리자')
@Controller('v1/admin/notifications')
@Roles(Role.SYSTEM_ADMIN)
@ApiBearerAuth()
export class AdminNotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        await this.notificationService.sendRequestNotification(
            sendNotificationDto.notificationType,
            sendNotificationDto.notificationData,
            sendNotificationDto.notificationTarget,
        );
    }
}
