import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationSnapshot } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { ReservationSnapshotRepositoryPort } from '@resource/modules/reservation/domain/ports/reservation-snapshot.repository.port';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto } from '@resource/modules/reservation/application/dtos/reservation-snapshot.dto';

@Injectable()
export class ReservationSnapshotRepository implements ReservationSnapshotRepositoryPort {
    constructor(
        @InjectRepository(ReservationSnapshot)
        private readonly repository: Repository<ReservationSnapshot>,
    ) {}

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationSnapshot[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationSnapshot)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationSnapshot | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationSnapshot)
            : this.repository;
        return repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
    }

    create(dto: CreateReservationSnapshotDto): ReservationSnapshot {
        const snapshot = this.repository.create(dto);
        return snapshot;
    }

    async save(snapshot: ReservationSnapshot, repositoryOptions?: RepositoryOptions): Promise<ReservationSnapshot> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationSnapshot)
            : this.repository;
        return repository.save(snapshot);
    }

    async update(id: string, dto: UpdateReservationSnapshotDto): Promise<ReservationSnapshot> {
        await this.repository.update(id, dto);
        const updated = await this.repository.findOne({
            where: { snapshotId: id },
        });
        return updated;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationSnapshot)
            : this.repository;
        await repository.delete(id);
    }

    async count(repositoryOptions?: RepositoryOptions): Promise<number> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationSnapshot)
            : this.repository;
        return repository.count({
            where: repositoryOptions?.where
        });
    }
} 