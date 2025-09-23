import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CronReservationService } from '../services/cron-reservation.service';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('2. 예약 ')
@Public()
@Controller('v1/reservations')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
export class CronReservationController {
    constructor(private readonly cronReservationService: CronReservationService) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/close')
    async closeReservation() {
        return this.cronReservationService.closeReservation();
    }

    @ApiExcludeEndpoint()
    @Get('cron-job/start-odometer')
    async handleStartOdometer() {
        return this.cronReservationService.handleStartOdometer();
    }
}
