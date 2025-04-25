import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { NotificationUsecase } from '@resource/modules/notification/application/usecases/notification.usecase';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';

import { PushSubscriptionDto } from '@resource/modules/notification/application/dto/push-subscription.dto';
import { ResponseNotificationDto } from '@resource/modules/notification/application/dto/response-notification.dto';
import { SendNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';

@ApiTags('알림')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
    constructor(private readonly notificationUsecase: NotificationUsecase) {}

    // check api
    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async subscribe(@User() user: UserEntity, @Body() subscription: PushSubscriptionDto): Promise<void> {
        await this.notificationUsecase.subscribe(user, subscription);
    }

    @Post('unsubscribe')
    @ApiOperation({ summary: '웹 푸시 구독 취소' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 취소 성공',
    })
    async unsubscribe(@User() user: UserEntity) {
        await this.notificationUsecase.unsubscribe(user);
    }

    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        await this.notificationUsecase.createNotification(
            sendNotificationDto.notificationType,
            sendNotificationDto.notificationData,
            sendNotificationDto.notificationTarget,
        );
    }

    // check api
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
        return await this.notificationUsecase.findMyNotifications(employeeId, query);
    }

    // check api
    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    async markAsRead(@User() user: UserEntity, @Param('notificationId') notificationId: string) {
        await this.notificationUsecase.markAsRead(user.employeeId, notificationId);
    }

    @ApiTags('알림테스트')
    @Post('send/test')
    @ApiOperation({ summary: '알람 테스트 전송' })
    @ApiDataResponse({
        status: 200,
        description: '알람 테스트 전송 성공',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                notification: { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' } } },
                data: { type: 'object', properties: { title: { type: 'string' }, body: { type: 'string' } } },
            },
        },
    })
    async sendTest(
        @User() user: UserEntity,
        @Body() sendNotificationDto: { notification: { title: string; body: string }; target: string[] },
    ) {
        await this.notificationUsecase.sendTestNotification(user, sendNotificationDto);
    }

    // @Patch(':employeeId/readAll')
    // @ApiOperation({ summary: '모든 알람 읽음 처리' })
    // async markAllAsRead(@Param('employeeId') employeeId: string) {
    //     // await this.notificationService.markAllAsRead();
    // }
}
