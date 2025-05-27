import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '@libs/entities/reservation.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainReservationRepository extends BaseRepository<Reservation> {
    constructor(
        @InjectRepository(Reservation)
        repository: Repository<Reservation>,
    ) {
        super(repository);
    }
}
