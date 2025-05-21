import { Reservation } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationDto } from '../../application/dtos/create-reservation.dto';

export interface ReservationRepositoryPort {
    create(createDto: CreateReservationDto, repositoryOptions?: RepositoryOptions): Reservation;
    save(reservation: Reservation, repositoryOptions?: RepositoryOptions): Promise<Reservation>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<Reservation | null>;
    findAll(repositoryOptions?: RepositoryOptions): Promise<Reservation[]>;
    update(id: string, reservation: Partial<Reservation>, repositoryOptions?: RepositoryOptions): Promise<Reservation>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
    count(repositoryOptions?: RepositoryOptions): Promise<number>;

    // findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Reservation | null>;
    // findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<Reservation[]>;
    // findConflictingReservations(
    //     resourceId: string,
    //     startDate: string,
    //     endDate: string,
    //     excludeReservationId?: string,
    //     repositoryOptions?: RepositoryOptions,
    // ): Promise<Reservation[]>;
}
