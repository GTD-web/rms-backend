import { Injectable } from '@nestjs/common';
import { HandleCronUsecase } from '../usecases/handle-cron.usecase';

@Injectable()
export class CronReservationService {
    constructor(private readonly handleCronUsecase: HandleCronUsecase) {}

    async closeReservation() {
        return this.handleCronUsecase.execute();
    }
}
