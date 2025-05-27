import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationRepository } from './reservation.repository';
import { BaseService } from '@libs/services/base.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Between } from 'typeorm';

@Injectable()
export class DomainReservationService extends BaseService<Reservation> {
    constructor(private readonly reservationRepository: DomainReservationRepository) {
        super(reservationRepository);
    }

    async findByReservationId(reservationId: string): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'participants',
                'participants.employee',
                'reservationVehicles',
                'reservationVehicles.vehicleInfo',
            ],
        });
        if (!reservation) {
            throw new NotFoundException('예약을 찾을 수 없습니다.');
        }
        return reservation;
    }

    async findByResourceId(resourceId: string): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: { resourceId },
            relations: [
                'resource',
                'participants',
                'participants.employee',
                'reservationVehicles',
                'reservationVehicles.vehicleInfo',
            ],
        });
    }

    async findByStatus(status: ReservationStatus): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: { status },
            relations: [
                'resource',
                'participants',
                'participants.employee',
                'reservationVehicles',
                'reservationVehicles.vehicleInfo',
            ],
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: {
                startDate: Between(startDate, endDate),
            },
            relations: [
                'resource',
                'participants',
                'participants.employee',
                'reservationVehicles',
                'reservationVehicles.vehicleInfo',
            ],
        });
    }

    async findByEmployeeId(employeeId: string): Promise<Reservation[]> {
        return this.reservationRepository.findAll({
            where: {
                participants: {
                    employeeId,
                },
            },
            relations: [
                'resource',
                'participants',
                'participants.employee',
                'reservationVehicles',
                'reservationVehicles.vehicleInfo',
            ],
        });
    }
}
