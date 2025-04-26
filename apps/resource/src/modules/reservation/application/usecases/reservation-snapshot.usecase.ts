import { Injectable } from '@nestjs/common';
import { ReservationSnapshotService } from '../services/reservation-snapshot.service';
import { ReservationSnapshot } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto } from '@resource/dtos.index';
import { ReservationSnapshotResponseDto } from '@resource/modules/reservation/application/dtos/reservation-snapshot.dto';
import { DateUtil } from '@libs/utils/date.util';
import { User } from '@libs/entities';


@Injectable()
export class ReservationSnapshotUsecase {
    constructor(
        private readonly snapshotService: ReservationSnapshotService,
    ) {}

    async createSnapshot(user: User, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        const snapshot = this.snapshotService.create(dto);
        snapshot.userId = user.userId;
        const savedSnapshot = await this.snapshotService.save(snapshot);
        return this.toResponseDto(savedSnapshot);
    }

    async updateSnapshot(dto: UpdateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        const updatedSnapshot = await this.snapshotService.update(dto.snapshotId, dto);
        return this.toResponseDto(updatedSnapshot);
    }

    async findSnapshotByUserId(userId: string): Promise<ReservationSnapshotResponseDto> {
        const snapshot = await this.snapshotService.findOne({
            where: { userId },
        });
        if (!snapshot) {
            throw new Error('Snapshot not found');
        }
        return this.toResponseDto(snapshot);
    }

    async findAllSnapshots(options?: RepositoryOptions): Promise<ReservationSnapshotResponseDto[]> {
        const snapshots = await this.snapshotService.findAll(options);
        return snapshots.map(snapshot => this.toResponseDto(snapshot));
    }

    async deleteSnapshot(snapshotId: string): Promise<void> {
        await this.snapshotService.delete(snapshotId);
    }

    private toResponseDto(snapshot: ReservationSnapshot): ReservationSnapshotResponseDto {
        return {
            snapshotId: snapshot.snapshotId,
            userId: snapshot.userId,
            resource: snapshot.resource,
            title: snapshot.title,
            description: snapshot.description,
            startDate: DateUtil.format(snapshot?.startDate),
            endDate: DateUtil.format(snapshot?.endDate),
            isAllDay: snapshot.isAllDay,
            notifyBeforeStart: snapshot.notifyBeforeStart,
            notifyMinutesBeforeStart: snapshot.notifyMinutesBeforeStart,
            participants: snapshot.participants,
            createdAt: snapshot.createdAt,
            updatedAt: snapshot.updatedAt,
        };
    }
} 