import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { NotificationService } from '@resource/modules/notification/application/services/notification.service';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { AdapterService } from '@resource/modules/notification/application/services/adapter.service';
import { Public } from '@libs/decorators/public.decorator';
import { WebPushSubscription } from '@resource/modules/notification/infrastructure/adapters/out/device/web-push.adapter';
import { NotificationUsecase } from '@resource/modules/notification/application/usecases/notification.usecase';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';

@ApiTags('알림')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
    constructor(
        private readonly notificationUsecase: NotificationUsecase,
        private readonly adapterService: AdapterService,
    ) {}

    @ApiTags('sprint0.3-')
    @Post('subscribe')
    @ApiOperation({ summary: '웹 푸시 구독' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 성공',
    })
    async subscribe(@User() user: UserEntity, @Body() subscription: WebPushSubscription): Promise<void> {
        await this.notificationUsecase.subscribe(user, subscription);
    }

    @ApiTags('sprint0.3-')
    @Post('unsubscribe')
    @ApiOperation({ summary: '웹 푸시 구독 취소' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 구독 취소 성공',
    })
    async unsubscribe(@User() user: UserEntity) {
        await this.notificationUsecase.unsubscribe(user);
    }

    @ApiTags('sprint0.3-')
    @Post('send')
    @ApiOperation({ summary: '웹 푸시 알림 전송' })
    @ApiDataResponse({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    })
    async send() {
        await this.adapterService.send();
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
