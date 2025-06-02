import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CronNotificationService } from '../services/cron-notification.service';

@ApiTags('5. 알림 ')
@Controller('v1/notifications')
@Public()
export class CronNotificationController {
    constructor(private readonly cronNotificationService: CronNotificationService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/send-upcoming-notification')
    async sendUpcomingNotification() {
        return this.cronNotificationService.sendUpcomingNotification();
    }
}
