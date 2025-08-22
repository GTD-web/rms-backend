import { Injectable } from '@nestjs/common';
import { DomainReservationRepository } from './reservation.repository';
import { BaseService } from '@libs/services/base.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { In } from 'typeorm';

@Injectable()
export class DomainReservationService extends BaseService<Reservation> {
    constructor(private readonly reservationRepository: DomainReservationRepository) {
        super(reservationRepository);
    }

    async findByReservationIds(reservationIds: string[]): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: { reservationId: In(reservationIds) },
            relations: ['resource'],
        });
    }

    async findByResourceIds(resourceIds: string[]): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: { resourceId: In(resourceIds) },
            relations: ['resource'],
        });
    }
}
