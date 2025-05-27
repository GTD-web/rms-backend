import { Public } from '@libs/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ReservationUsecase } from '@resource/modules/reservation/application/usecases/reservation.usecase';

@ApiTags('2. 예약 ')
@Public()
@Controller('v1/reservations')
export class CronReservationController {
    constructor(private readonly reservationUsecase: ReservationUsecase) {}

    @ApiExcludeEndpoint()
    @Get('cron-job/close')
    async closeReservation() {
        return this.reservationUsecase.handleCron();
    }
}
