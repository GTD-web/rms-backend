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

import { NotificationContextService } from '../services/notification.context.service';

@ApiTags('v2 알림 ')
@Controller('v2/notifications')
@ApiBearerAuth()
export class AdminNotificationController {
    constructor(private readonly notificationContextService: NotificationContextService) {}

    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        await this.notificationContextService.요청_알림을_전송한다(
            sendNotificationDto.notificationType,
            sendNotificationDto.notificationData,
            sendNotificationDto.notificationTarget,
        );
    }
}
