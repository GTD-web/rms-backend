import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { NotificationService } from '@resource/modules/notification/application/services/notification.service';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { AdapterService } from '@resource/modules/notification/application/services/adapter.service';

@ApiTags('알림')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly adapterService: AdapterService,
    ) {}

    @ApiTags('sprint0.3-')
    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    async subscribe(@Body() subscription: PushSubscription) {
        // await this.notificationService.subscribe(user.userId, subscription);
    }

    @ApiTags('sprint0.3-')
    @Post('unsubscribe')
    @ApiOperation({ summary: '웹 푸시 구독 취소' })
    async unsubscribe(@Body() subscription: PushSubscription) {
        // await this.notificationService.unsubscribe(user.userId, subscription);
    }

    @ApiTags('sprint0.3-')
    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    async send(@Body() notification: Notification) {
        // await this.notificationService.send(notification);
    }

    @ApiTags('sprint0.3-')
    @Post('resend/:notificationId')
    @ApiOperation({ summary: '알람 재전송' })
    async resend(@Param('notificationId') notificationId: string) {
        // await this.notificationService.resend(id);
    }

    @ApiTags('sprint0.3-')
    @Get()
    @ApiOperation({ summary: '알람 목록 조회' })
    async findAllByEmployeeId(@User('employeeId') employeeId: string) {
        // return this.notificationService.findAllByEmployeeId(employeeId);
    }

    @ApiTags('sprint0.3-')
    @Get(':notificationId')
    @ApiOperation({ summary: '알람 상세 조회' })
    async findById(@Param('notificationId') notificationId: string) {
        // return this.notificationService.findById(id);
    }

    @ApiTags('sprint0.3-')
    @Patch(':notificationId/read')
    @ApiOperation({ summary: '알람 읽음 처리' })
    async markAsRead(@Param('notificationId') notificationId: string) {
        // await this.notificationService.markAsRead(id);
    }

    @ApiTags('sprint0.3-')
    @Patch(':notificationId/unread')
    @ApiOperation({ summary: '알람 읽지 않음 처리' })
    async markAsUnread(@Param('notificationId') notificationId: string) {
        // await this.notificationService.markAsUnread(id);
    }

    @ApiTags('sprint0.3-')
    @Patch(':employeeId/readAll')
    @ApiOperation({ summary: '모든 알람 읽음 처리' })
    async markAllAsRead(@Param('employeeId') employeeId: string) {
        // await this.notificationService.markAllAsRead();
    }

    @ApiTags('sprint0.3-')
    @Delete(':notificationId')
    @ApiOperation({ summary: '알람 삭제' })
    async delete(@Param('notificationId') notificationId: string) {
        // await this.notificationService.delete(id);
    }
}
