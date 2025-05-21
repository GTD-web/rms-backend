import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationParticipant } from '@libs/entities';
import { ReservationParticipantRepositoryPort } from '../../../../domain/ports/reservation-participant.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ReservationParticipantRepository implements ReservationParticipantRepositoryPort {
    constructor(
        @InjectRepository(ReservationParticipant)
        private readonly repository: Repository<ReservationParticipant>,
    ) {}

    async save(
        participant: ReservationParticipant,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationParticipant> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationParticipant)
            : this.repository;
        const entity = repository.create(participant);
        const saved = await repository.save(entity);
        return saved;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationParticipant)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationParticipant)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
    }

    async update(
        id: string,
        participant: Partial<ReservationParticipant>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationParticipant> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationParticipant)
            : this.repository;
        await repository.update(id, participant);
        const updated = await repository.findOne({
            where: { participantId: id },
        });
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationParticipant)
            : this.repository;
        await repository.delete(id);
    }
}
