import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '@libs/entities/reservation.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
@Injectable()
export class DomainReservationRepository extends BaseRepository<Reservation> {
    constructor(
        @InjectRepository(Reservation)
        repository: Repository<Reservation>,
    ) {
        super(repository);
    }

    async count(repositoryOptions: IRepositoryOptions<Reservation>): Promise<number> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;

        return await repository.count({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
}
