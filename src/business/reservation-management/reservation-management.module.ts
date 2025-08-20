import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { CronReservationController } from './controllers/cron.reservation.controller';
import { ReservationContextModule } from '@src/context/reservation/reservation.context.module';
import { ReservationService } from './services/reservation.service';
import { CronReservationService } from './services/cron-reservation.service';

@Module({
    imports: [
        ReservationContextModule, // Context 레이어의 서비스들을 사용하기 위해 import
    ],
    controllers: [ReservationController, CronReservationController],
    providers: [ReservationService, CronReservationService],
    exports: [],
})
export class ReservationManagementModule {}
