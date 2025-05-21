import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ReservationService } from '../services/reservation.service';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ReservationEventHandler {
    constructor(private readonly reservationService: ReservationService) {}

    @OnEvent('find.reservation')
    async handleFindReservation(payload: { repositoryOptions?: RepositoryOptions }) {
        // 새로운 Employee가 생성되면 캐시를 갱신하거나 필요한 처리를 수행
        return await this.reservationService.findAll(payload.repositoryOptions);
    }
}
