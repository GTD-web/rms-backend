import { ReservationSnapshot } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto } from '@resource/modules/reservation/application/dtos/reservation-snapshot.dto';
export interface ReservationSnapshotRepositoryPort {
    findOne(options: RepositoryOptions): Promise<ReservationSnapshot | null>;
    findAll(options: RepositoryOptions): Promise<ReservationSnapshot[]>;
    create(dto: CreateReservationSnapshotDto): ReservationSnapshot;
    save(entity: ReservationSnapshot, options?: RepositoryOptions): Promise<ReservationSnapshot>;
    update(id: string, dto: UpdateReservationSnapshotDto, options?: RepositoryOptions): Promise<ReservationSnapshot>;
    delete(id: string, options?: RepositoryOptions): Promise<void>;
    count(options: RepositoryOptions): Promise<number>;
} 