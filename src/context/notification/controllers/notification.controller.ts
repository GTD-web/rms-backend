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
export class NotificationController {
    constructor(private readonly notificationContextService: NotificationContextService) {}

    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async subscribe(@User() user: Employee, @Body() subscription: PushSubscriptionDto): Promise<void> {
        await this.notificationContextService.푸시_알림을_구독한다(user.employeeId, subscription);
    }

    @Post('subscribe/success')
    @ApiOperation({ summary: '웹 푸시 구독 성공' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async sendSuccess(@Body() body: PushNotificationDto) {
        await this.notificationContextService.직접_알림을_전송한다(body.subscription, body.payload);
    }

    @Post('send/reminder')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        await this.notificationContextService.리마인더_알림을_전송한다(
            sendNotificationDto.notificationType,
            sendNotificationDto.notificationData,
            sendNotificationDto.notificationTarget,
        );
    }

    @Get()
    @ApiOperation({ summary: '알람 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '알람 목록 조회 성공',
        type: [ResponseNotificationDto],
        isPaginated: true,
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
    })
    async findAllByEmployeeId(
        @User('employeeId') employeeId: string,
        @Query() query: PaginationQueryDto,
    ): Promise<PaginationData<ResponseNotificationDto>> {
        return await this.notificationContextService.내_알림_목록을_조회한다(employeeId, query);
    }

    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    async markAsRead(@User() user: Employee, @Param('notificationId') notificationId: string) {
        await this.notificationContextService.알림을_읽음_처리한다(user.employeeId, notificationId);
    }

    @Get('subscription')
    @ApiOperation({ summary: '구독 정보 조회' })
    @ApiDataResponse({
        status: 200,
        description: '구독 정보 조회 성공',
    })
    @ApiQuery({
        name: 'token',
        type: String,
        required: false,
        description: '구독 토큰',
    })
    @ApiQuery({
        name: 'employeeId',
        type: String,
        required: false,
        description: '직원 ID',
    })
    async findSubscription(@Query('token') token?: string, @Query('employeeId') employeeId?: string) {
        return await this.notificationContextService.구독_정보를_조회한다(token, employeeId);
    }
}
