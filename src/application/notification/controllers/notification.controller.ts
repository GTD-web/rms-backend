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

import { NotificationService } from '../notification.service';

@ApiTags('5. 알림 ')
@Controller('v1/notifications')
@Roles(Role.USER)
@ApiBearerAuth()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async subscribe(@User() user: Employee, @Body() subscription: PushSubscriptionDto): Promise<void> {
        await this.notificationService.subscribe(user, subscription);
    }

    @Post('subscribe/success')
    @ApiOperation({ summary: '웹 푸시 구독 성공' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async sendSuccess(@Body() body: PushNotificationDto) {
        await this.notificationService.sendDirectNotification(body.subscription, body.payload);
    }

    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        console.log('예약상세 - 알림 보내기', sendNotificationDto);
        await this.notificationService.createNotification(
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
        return await this.notificationService.findMyNotifications(employeeId, query);
    }

    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    async markAsRead(@User() user: Employee, @Param('notificationId') notificationId: string) {
        await this.notificationService.markAsRead(user.employeeId, notificationId);
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
        return await this.notificationService.findSubscription(token, employeeId);
    }
}
