import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CronNotificationService } from '../services/cron-notification.service';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('5. 알림 ')
@Controller('v1/notifications')
@Public()
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class CronNotificationController {
    constructor(private readonly cronNotificationService: CronNotificationService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/send-upcoming-notification')
    async sendUpcomingNotification() {
        return this.cronNotificationService.sendUpcomingNotification();
    }
}
