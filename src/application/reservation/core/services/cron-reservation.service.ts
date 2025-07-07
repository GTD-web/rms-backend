import { Injectable } from '@nestjs/common';
import { HandleCronUsecase } from '../usecases/handle-cron.usecase';
import { HandleStartOdometerUsecase } from '../usecases/handle-start-odometer.usecase';

@Injectable()
export class CronReservationService {
    constructor(
        private readonly handleCronUsecase: HandleCronUsecase,
        private readonly handleStartOdometerUsecase: HandleStartOdometerUsecase,
    ) {}

    async closeReservation() {
        return this.handleCronUsecase.execute();
    }

    async handleStartOdometer() {
        return this.handleStartOdometerUsecase.execute();
    }
}
