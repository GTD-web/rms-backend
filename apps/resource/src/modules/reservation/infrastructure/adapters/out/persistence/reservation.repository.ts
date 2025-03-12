import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '@libs/entities';
import { ReservationRepositoryPort } from '../../../../domain/ports/reservation.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationDto } from '@resource/modules/reservation/application/dtos/create-reservation.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
@Injectable()
export class ReservationRepository implements ReservationRepositoryPort {
    constructor(
        @InjectRepository(Reservation)
        private readonly repository: Repository<Reservation>,
    ) {}

    create(createDto: CreateReservationDto): Reservation {
        const reservation = new Reservation();
        reservation.resourceId = createDto.resourceId;
        reservation.title = createDto.title;
        reservation.description = createDto.description;
        reservation.startDate = createDto.startDate;
        reservation.endDate = createDto.endDate;
        reservation.isAllDay = createDto.isAllDay;
        reservation.notifyBeforeStart = createDto.notifyBeforeStart;
        reservation.notifyMinutesBeforeStart = createDto.notifyMinutesBeforeStart;
        reservation.status =
            createDto.resourceType === ResourceType.ACCOMMODATION
                ? ReservationStatus.PENDING
                : ReservationStatus.CONFIRMED;
        return reservation;
    }

    async save(reservation: Reservation, repositoryOptions?: RepositoryOptions<Reservation>): Promise<Reservation> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Reservation)
            : this.repository;
        const saved = await repository.save(reservation);
        return saved;
    }

    async findOne(repositoryOptions?: RepositoryOptions<Reservation>): Promise<Reservation | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Reservation)
            : this.repository;
        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
        return entity ? entity : null;
    }

    async findAll(repositoryOptions?: RepositoryOptions<Reservation>): Promise<Reservation[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Reservation)
            : this.repository;
        const entities = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
        return entities;
    }

    async update(
        id: string,
        reservation: Partial<Reservation>,
        repositoryOptions?: RepositoryOptions<Reservation>,
    ): Promise<Reservation> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Reservation)
            : this.repository;
        await repository.update(id, reservation);
        const updated = await repository.findOne({ where: { reservationId: id } });
        return updated!;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions<Reservation>): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(Reservation)
            : this.repository;
        await repository.delete(id);
    }
}
