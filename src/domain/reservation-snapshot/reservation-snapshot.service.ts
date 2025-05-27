import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationSnapshotRepository } from './reservation-snapshot.repository';
import { BaseService } from '@libs/services/base.service';
import { ReservationSnapshot } from '@libs/entities/reservation-snapshot.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class DomainReservationSnapshotService extends BaseService<ReservationSnapshot> {
    constructor(private readonly reservationSnapshotRepository: DomainReservationSnapshotRepository) {
        super(reservationSnapshotRepository);
    }

    async findBySnapshotId(snapshotId: string): Promise<ReservationSnapshot> {
        const snapshot = await this.reservationSnapshotRepository.findOne({
            where: { snapshotId },
            relations: ['user'],
        });
        if (!snapshot) {
            throw new NotFoundException('예약 스냅샷을 찾을 수 없습니다.');
        }
        return snapshot;
    }

    async findByUserId(userId: string): Promise<ReservationSnapshot[]> {
        return this.reservationSnapshotRepository.findAll({
            where: { userId },
            relations: ['user'],
        });
    }
}
