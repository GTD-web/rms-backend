import { Injectable } from '@nestjs/common';
import { DomainReservationRepository } from './reservation.repository';
import { BaseService } from '@libs/services/base.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class DomainReservationService extends BaseService<Reservation> {
    constructor(private readonly reservationRepository: DomainReservationRepository) {
        super(reservationRepository);
    }

    async count(repositoryOptions: IRepositoryOptions<Reservation>): Promise<number> {
        return await this.reservationRepository.count(repositoryOptions);
    }
}
