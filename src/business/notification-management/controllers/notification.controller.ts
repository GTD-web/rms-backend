import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Param, Body, Query, Req, Type } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@libs/decorators/user.decorator';
import { Employee } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Public } from '@libs/decorators/public.decorator';
import { NotificationType } from '@libs/enums/notification-type.enum';

// Context DTOs (business layer에서 context layer DTO 사용)
import { PushSubscriptionDto } from '@src/context/notification/dtos/push-subscription.dto';
import { ResponseNotificationDto } from '@src/context/notification/dtos/response-notification.dto';
import { NotificationTypeResponseDto } from '@src/context/notification/dtos/notification-type-response.dto';
import { SendNotificationDto } from '@src/context/notification/dtos/create-notification.dto';
import { PushNotificationDto } from '@src/context/notification/dtos/send-notification.dto';

// Business Service
import { NotificationManagementService } from '../notification-management.service';

@ApiTags('v2 알림 ')
@Controller('v2/notifications')
@ApiBearerAuth()
export class NotificationController {
    constructor(private readonly notificationManagementService: NotificationManagementService) {}

    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiOkResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
        type: ResponseNotificationDto,
    })
    async subscribe(
        // @Req() request: Request,
        @User() user: Employee,
        @Body() subscription: PushSubscriptionDto,
    ): Promise<void> {
        // const authorization = Array.isArray(request.headers.authorization)
        //     ? request.headers.authorization[0]
        //     : request.headers.authorization || '';
        await this.notificationManagementService.웹푸시를_구독한다(user.employeeId, subscription);
    }

    @Post('subscribe/success')
    @ApiOperation({ summary: '웹 푸시 구독 성공' })
    @ApiOkResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async sendSuccess(@Body() body: PushNotificationDto) {
        await this.notificationManagementService.푸시_알림을_직접_전송한다([body.subscription.fcm.token], body.payload);
    }

    // @Post('send/reminder')
    // @ApiOperation({ summary: '예약 리마인더 알림 전송' })
    // @ApiOkResponse({
    //     status: 200,
    //     description: '예약 리마인더 알림 전송 성공',
    // })
    // async sendReminder(@Body() sendNotificationDto: SendNotificationDto) {
    //     await this.notificationManagementService.리마인더_알림을_전송한다(
    //         sendNotificationDto.notificationData,
    //         sendNotificationDto.notificationTarget,
    //     );
    // }

    @Post('send')
    @ApiOperation({ summary: '알림 전송' })
    @ApiOkResponse({
        status: 200,
        description: '알림 전송 성공',
    })
    async send(@Body() sendNotificationDto: SendNotificationDto) {
        await this.notificationManagementService.알림을_전송한다(
            sendNotificationDto.notificationType,
            sendNotificationDto.notificationData,
            sendNotificationDto.notificationTarget,
        );
    }

    @Get('types')
    @ApiOperation({ summary: '알림 타입 목록 조회' })
    @ApiOkResponse({
        description: '알림 타입 목록 조회 성공',
        type: [NotificationTypeResponseDto],
    })
    async getNotificationTypes(): Promise<NotificationTypeResponseDto[]> {
        return await this.notificationManagementService.알림_타입_목록을_조회한다();
    }

    @Get()
    @ApiOperation({ summary: '알람 목록 조회' })
    @ApiOkResponse({
        description: '알람 목록 조회 성공',
        type: PaginationData<ResponseNotificationDto>,
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
    @ApiQuery({
        name: 'resourceType',
        enum: ResourceType,
        required: false,
        description: '자원 타입별 필터링 (차량, 회의실, 숙박시설, 장비)',
    })
    async findAllByEmployeeId(
        @User('employeeId') employeeId: string,
        @Query() query: PaginationQueryDto,
        @Query('resourceType') resourceType?: ResourceType,
    ): Promise<PaginationData<ResponseNotificationDto>> {
        return await this.notificationManagementService.내_알림_목록을_조회한다(employeeId, query, resourceType);
    }

    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    @ApiOkResponse({
        status: 200,
        description: '알람 읽음 처리 성공',
    })
    async markAsRead(@User() user: Employee, @Param('notificationId') notificationId: string) {
        await this.notificationManagementService.알림을_읽음_처리한다(user.employeeId, notificationId);
    }

    @Patch('mark-all-read')
    @ApiOperation({ summary: '모든 알람 읽음 처리' })
    @ApiOkResponse({
        status: 200,
        description: '모든 알람 읽음 처리 성공',
    })
    async markAllAsRead(@User('employeeId') employeeId: string) {
        await this.notificationManagementService.모든_알림을_읽음_처리한다(employeeId);
    }

    // @Get('subscription')
    // @ApiOperation({ summary: '구독 정보 조회' })
    // @ApiOkResponse({
    //     status: 200,
    //     description: '구독 정보 조회 성공',
    // })
    // @ApiQuery({
    //     name: 'token',
    //     type: String,
    //     required: false,
    //     description: '구독 토큰',
    // })
    // @ApiQuery({
    //     name: 'employeeId',
    //     type: String,
    //     required: false,
    //     description: '직원 ID',
    // })
    // async findSubscription(@Query('token') token?: string, @Query('employeeId') employeeId?: string) {
    //     return await this.notificationContextService.구독_정보를_조회한다(token, employeeId);
    // }
}
