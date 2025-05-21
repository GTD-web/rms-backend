import { Injectable, Inject } from '@nestjs/common';
import { ReservationVehicleRepositoryPort } from '../../domain/ports/reservation-vehicle.repository.port';
import { ReservationVehicle } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class ReservationVehicleService {
    constructor(
        @Inject('ReservationVehicleRepositoryPort')
        private readonly reservationVehicleRepository: ReservationVehicleRepositoryPort,
    ) {}

    async save(
        reservationVehicle: ReservationVehicle,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle> {
        return await this.reservationVehicleRepository.save(reservationVehicle, repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle[]> {
        return await this.reservationVehicleRepository.findAll(repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle | null> {
        return await this.reservationVehicleRepository.findOne(repositoryOptions);
    }

    async update(
        id: string,
        reservationVehicle: Partial<ReservationVehicle>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle> {
        return await this.reservationVehicleRepository.update(id, reservationVehicle, repositoryOptions);
    }

    async delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        await this.reservationVehicleRepository.delete(id, repositoryOptions);
    }

    async count(repositoryOptions?: RepositoryOptions): Promise<number> {
        return await this.reservationVehicleRepository.count(repositoryOptions);
    }

    async updateOdometer(
        id: string,
        startOdometer: number,
        endOdometer: number,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle> {
        return await this.reservationVehicleRepository.updateOdometer(
            id,
            startOdometer,
            endOdometer,
            repositoryOptions,
        );
    }

    async updateFuelLevel(
        id: string,
        startFuelLevel: number,
        endFuelLevel: number,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle> {
        return await this.reservationVehicleRepository.updateFuelLevel(
            id,
            startFuelLevel,
            endFuelLevel,
            repositoryOptions,
        );
    }

    async markAsReturned(id: string, repositoryOptions?: RepositoryOptions): Promise<ReservationVehicle> {
        return await this.reservationVehicleRepository.markAsReturned(id, repositoryOptions);
    }

    async findByReservationId(
        reservationId: string,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle[]> {
        return await this.reservationVehicleRepository.findByReservationId(reservationId, repositoryOptions);
    }

    async findByVehicleInfoId(
        vehicleInfoId: string,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ReservationVehicle[]> {
        return await this.reservationVehicleRepository.findByVehicleInfoId(vehicleInfoId, repositoryOptions);
    }
}
