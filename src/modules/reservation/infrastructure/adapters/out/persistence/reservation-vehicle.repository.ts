import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationVehicle } from '@libs/entities';
import { ReservationVehicleRepositoryPort } from '../../../../domain/ports/reservation-vehicle.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class ReservationVehicleRepository implements ReservationVehicleRepositoryPort {
    constructor(
        @InjectRepository(ReservationVehicle)
        private readonly repository: Repository<ReservationVehicle>,
    ) {}

    async save(
        reservationVehicle: ReservationVehicle,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        return await repository.save(reservationVehicle);
    }

    async findOne(repositoryOptions?: RepositoryOptions<ReservationVehicle>): Promise<ReservationVehicle | null> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        const entity = await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            withDeleted: repositoryOptions?.withDeleted,
        });

        return entity ? entity : null;
    }

    async findAll(repositoryOptions?: RepositoryOptions<ReservationVehicle>): Promise<ReservationVehicle[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        return await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }

    async update(
        id: string,
        reservationVehicle: Partial<ReservationVehicle>,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        await repository.update({ reservationVehicleId: id }, reservationVehicle);
        const updated = await repository.findOne({ where: { reservationVehicleId: id } });

        return updated!;
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions<ReservationVehicle>): Promise<void> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        await repository.delete({ reservationVehicleId: id });
    }

    async count(repositoryOptions?: RepositoryOptions<ReservationVehicle>): Promise<number> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(ReservationVehicle)
            : this.repository;

        return await repository.count({
            where: repositoryOptions?.where,
        });
    }

    async updateOdometer(
        id: string,
        startOdometer: number,
        endOdometer: number,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle> {
        return this.update(
            id,
            {
                startOdometer,
                endOdometer,
            },
            repositoryOptions,
        );
    }

    async updateFuelLevel(
        id: string,
        startFuelLevel: number,
        endFuelLevel: number,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle> {
        return this.update(
            id,
            {
                startFuelLevel,
                endFuelLevel,
            },
            repositoryOptions,
        );
    }

    async markAsReturned(
        id: string,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle> {
        return this.update(
            id,
            {
                isReturned: true,
                returnedAt: new Date(),
            },
            repositoryOptions,
        );
    }

    async findByReservationId(
        reservationId: string,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle[]> {
        const options: RepositoryOptions<ReservationVehicle> = {
            ...repositoryOptions,
            where: { reservationId },
        };

        return this.findAll(options);
    }

    async findByVehicleInfoId(
        vehicleInfoId: string,
        repositoryOptions?: RepositoryOptions<ReservationVehicle>,
    ): Promise<ReservationVehicle[]> {
        const options: RepositoryOptions<ReservationVehicle> = {
            ...repositoryOptions,
            where: { vehicleInfoId },
        };

        return this.findAll(options);
    }
}
