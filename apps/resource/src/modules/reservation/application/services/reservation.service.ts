import { Injectable, Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from '../../domain/ports/reservation.repository.port';
import { Reservation } from '@libs/entities';
import { LessThan, MoreThanOrEqual } from 'typeorm';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Injectable()
export class ReservationService {
    constructor(
        @Inject('ReservationRepositoryPort')
        private readonly reservationRepository: ReservationRepositoryPort,
    ) {}

    create(createDto: CreateReservationDto): Reservation {
        const reservation = this.reservationRepository.create(createDto);
        return reservation;
    }

    async save(reservation: Reservation, repositoryOptions?: RepositoryOptions): Promise<Reservation> {
        const savedReservation = await this.reservationRepository.save(reservation, repositoryOptions);
        return savedReservation;
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<Reservation[]> {
        const reservations = await this.reservationRepository.findAll(repositoryOptions);
        return reservations;
    }

    async count(repositoryOptions?: RepositoryOptions): Promise<number> {
        const count = await this.reservationRepository.count(repositoryOptions);
        return count;
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne(repositoryOptions);
        return reservation;
    }

    async update(
        reservationId: string,
        reservation: Partial<Reservation>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<Reservation> {
        const updatedReservation = await this.reservationRepository.update(
            reservationId,
            reservation,
            repositoryOptions,
        );
        return updatedReservation;
    }

    async findConflictingReservations(resourceId: string, startDate: Date, endDate: Date): Promise<Reservation[]> {
        return await this.findAll({
            where: {
                resourceId,
                startDate: LessThan(endDate),
                endDate: MoreThanOrEqual(startDate),
                status: ReservationStatus.CONFIRMED,
            },
        });
    }

    // async findByResourceId(
    //     resourceId: string,
    //     startDate?: string,
    //     endDate?: string,
    // ): Promise<ReservationResponseDto[]> {
    //     const repositoryOptions: RepositoryOptions = {
    //         where: {
    //             resourceId,
    //             ...(startDate && { startDate: MoreThanOrEqual(startDate + ' 00:00:00') }),
    //             ...(endDate && { endDate: LessThanOrEqual(endDate + ' 23:59:59') }),
    //         },
    //         relations: ['schedules'],
    //     };
    //     const reservations = await this.reservationRepository.findByResourceId(resourceId, repositoryOptions);
    //     return reservations;
    // }

    // async delete(id: string): Promise<void> {
    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     try {
    //         await this.participantRepository.deleteByReservationId(id, { queryRunner });
    //         await this.scheduleRepository.deleteByReservationId(id, { queryRunner });
    //         await this.reservationRepository.delete(id, { queryRunner });
    //         await queryRunner.commitTransaction();
    //     } catch (error) {
    //         await queryRunner.rollbackTransaction();
    //         throw error;
    //     } finally {
    //         await queryRunner.release();
    //     }
    // }
}
