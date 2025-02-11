import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from '../../application/services/notification.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { SubscriptionDto } from '../dtos/subscription.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async getUserNotifications(@CurrentUser() user: any) {
        return this.notificationService.getUserNotifications(user.id);
    }

    @Put(':id/read')
    async markAsRead(@Param('id') id: string) {
        await this.notificationService.markAsRead(id);
    }

    @Post('subscribe')
    async subscribe(@CurrentUser() user: any, @Body() subscriptionDto: SubscriptionDto) {
        await this.notificationService.subscribe(user.id, subscriptionDto.subscription);
    }
}
