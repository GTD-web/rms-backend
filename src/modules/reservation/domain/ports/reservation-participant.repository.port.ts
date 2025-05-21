import { ReservationParticipant } from '@libs/entities';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ReservationParticipantRepositoryPort {
    save(participant: ReservationParticipant, repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant>;
    findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant>;
    update(
        id: string,
        participant: Partial<ReservationParticipant>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationParticipant>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;

    // findById(id: string, repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant | null>;
    // findByReservationId(reservationId: string, repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]>;
    // findByEmployeeId(employeeId: string, repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]>;
    // findByReservationIdAndType(reservationId: string, type: ParticipantsType, repositoryOptions?: RepositoryOptions): Promise<ReservationParticipant[]>;
    // deleteByReservationId(reservationId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
