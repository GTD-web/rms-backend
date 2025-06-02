import { Injectable } from '@nestjs/common';
import { CronSendUpcomingNotificationUsecase } from '../usecases/cronSendUpcomingNotification.usecase';

@Injectable()
export class CronNotificationService {
    constructor(private readonly cronSendUpcomingNotificationUsecase: CronSendUpcomingNotificationUsecase) {}

    async sendUpcomingNotification() {
        return this.cronSendUpcomingNotificationUsecase.execute();
    }
}
