import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CronNotificationContextService } from '../services/cron-notification.context.service';

@ApiTags('v2 알림 ')
@Controller('v2/notifications')
@Public()
export class CronNotificationController {
    constructor(private readonly cronNotificationContextService: CronNotificationContextService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/send-upcoming-notification')
    async sendUpcomingNotification() {
        return this.cronNotificationContextService.다가오는_알림을_전송한다();
    }
}
