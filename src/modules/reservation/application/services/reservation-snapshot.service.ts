import { Inject, Injectable } from '@nestjs/common';
import { ReservationSnapshotRepositoryPort } from '@resource/modules/reservation/domain/ports/reservation-snapshot.repository.port';
import { ReservationSnapshot } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto } from '@resource/dtos.index';

@Injectable()
export class ReservationSnapshotService {
    constructor(
        @Inject('ReservationSnapshotRepositoryPort')
        private readonly repository: ReservationSnapshotRepositoryPort,
    ) {}

    async findOne(options: RepositoryOptions): Promise<ReservationSnapshot | null> {
        return this.repository.findOne(options);
    }

    async findAll(options: RepositoryOptions): Promise<ReservationSnapshot[]> {
        return this.repository.findAll(options);
    }

    create(dto: CreateReservationSnapshotDto): ReservationSnapshot {
        const snapshot = this.repository.create(dto);
        return snapshot;
    }

    async save(snapshot: ReservationSnapshot, options?: RepositoryOptions): Promise<ReservationSnapshot> {
        return this.repository.save(snapshot, options);
    }

    async update(id: string, dto: UpdateReservationSnapshotDto, options?: RepositoryOptions): Promise<ReservationSnapshot> {
        return this.repository.update(id, dto, options);
    }

    async delete(id: string, options?: RepositoryOptions): Promise<void> {
        await this.repository.delete(id, options);
    }

    async count(options: RepositoryOptions): Promise<number> {
        return this.repository.count(options);
    }
} 