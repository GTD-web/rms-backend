import { Injectable } from '@nestjs/common';
import { LegacyReservationContextService } from '@src/context/reservation/services/legacy-reservation.context.service';

@Injectable()
export class CronReservationService {
    constructor(private readonly reservationContextService: LegacyReservationContextService) {}

    // ==================== 크론 작업 처리 ====================
    async closeReservation(): Promise<void> {
        return this.reservationContextService.크론_작업을_처리한다();
    }

    async handleStartOdometer(): Promise<void> {
        return this.reservationContextService.시작주행거리를_처리한다();
    }
}
