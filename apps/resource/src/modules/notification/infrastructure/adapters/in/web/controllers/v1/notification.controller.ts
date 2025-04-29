import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';

@ApiTags('5. 알림 - 사용자 페이지')
@Controller('v1/notifications')
@ApiBearerAuth()
@Roles(Role.USER)
export class UserNotificationController {
    constructor(private readonly notificationUsecase: NotificationUsecase) {}

    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async subscribe(@User() user: UserEntity, @Body() subscription: PushSubscriptionDto): Promise<void> {
        await this.notificationUsecase.subscribe(user, subscription);
    }

    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        console.log(sendNotificationDto);
        sendNotificationDto.notificationTarget = ['374054a4-0663-40b0-b96b-169719597703'];
        sendNotificationDto.notificationData = {
            reservationId: '1',
            reservationTitle: 'test',
            reservationDate: '2025-01-01',
            beforeMinutes: 10,
            resourceId: '1',
            resourceName: 'test',
            resourceType: ResourceType.VEHICLE,
            consumableName: 'test',
        };
        sendNotificationDto.notificationType = NotificationType.RESERVATION_STATUS_CONFIRMED;

        await this.notificationUsecase.createNotification(
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
        return await this.notificationUsecase.findMyNotifications(employeeId, query);
    }

    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    async markAsRead(@User() user: UserEntity, @Param('notificationId') notificationId: string) {
        await this.notificationUsecase.markAsRead(user.employeeId, notificationId);
    }

    // @Patch(':employeeId/readAll')
    // @ApiOperation({ summary: '모든 알람 읽음 처리' })
    // async markAllAsRead(@Param('employeeId') employeeId: string) {
    //     // await this.notificationService.markAllAsRead();
    // }
}
