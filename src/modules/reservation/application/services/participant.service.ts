import { Injectable, Inject } from '@nestjs/common';
import { ReservationParticipantRepositoryPort } from '../../domain/ports/reservation-participant.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ReservationParticipant } from '@libs/entities';

@Injectable()
export class ParticipantService {
    constructor(
        @Inject('ReservationParticipantRepositoryPort')
        private readonly participantRepository: ReservationParticipantRepositoryPort,
    ) {}

    async save(
        participant: ReservationParticipant,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationParticipant> {
        return this.participantRepository.save(participant, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]> {
        return this.participantRepository.findAll(repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant> {
        return this.participantRepository.findOne(repositoryOptions);
    }

    async update(
        id: string,
        participant: Partial<ReservationParticipant>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationParticipant> {
        return this.participantRepository.update(id, participant, repositoryOptions);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        return this.participantRepository.delete(id, repositoryOptions);
    }
}
