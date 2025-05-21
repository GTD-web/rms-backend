import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from '@resource/modules/notification/application/services/notification.service';
import { Notification } from '@libs/entities';
import { Public } from '@libs/decorators/public.decorator';
import { CreateNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@ApiTags('Notification Domain Test')
@Controller('domain/notifications')
@Public()
export class NotificationDomainController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    @ApiOperation({ summary: '모든 알림 조회' })
    @ApiResponse({ status: 200, description: '모든 알림 조회 성공', type: [Notification] })
    async findAll(): Promise<Notification[]> {
        return this.notificationService.findAll();
    }

    @Get('count')
    @ApiOperation({ summary: '알림 개수 조회' })
    @ApiResponse({ status: 200, description: '알림 개수 조회 성공', type: Number })
    async count(): Promise<number> {
        return this.notificationService.count();
    }

    @Get(':id')
    @ApiOperation({ summary: '알림 ID로 조회' })
    @ApiResponse({ status: 200, description: '알림 조회 성공', type: Notification })
    async findById(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: '알림 생성' })
    @ApiResponse({ status: 201, description: '알림 생성 성공', type: Notification })
    async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationService.save(createNotificationDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '알림 업데이트' })
    @ApiResponse({ status: 200, description: '알림 업데이트 성공', type: Notification })
    async update(@Param('id') id: string, @Body() notification: Partial<Notification>): Promise<Notification> {
        return this.notificationService.update(id, notification);
    }

    @Patch(':id/read')
    @ApiOperation({ summary: '알림 읽음 표시' })
    @ApiResponse({ status: 200, description: '알림 읽음 표시 성공' })
    async markAsRead(@Param('id') id: string): Promise<void> {
        return this.notificationService.markAsRead(id);
    }

    @Patch(':id/unread')
    @ApiOperation({ summary: '알림 읽지 않음 표시' })
    @ApiResponse({ status: 200, description: '알림 읽지 않음 표시 성공' })
    async markAsUnread(@Param('id') id: string): Promise<void> {
        return this.notificationService.markAsUnread(id);
    }

    @Patch('read-all')
    @ApiOperation({ summary: '모든 알림 읽음 표시' })
    @ApiResponse({ status: 200, description: '모든 알림 읽음 표시 성공' })
    async markAllAsRead(): Promise<void> {
        return this.notificationService.markAllAsRead();
    }
}
