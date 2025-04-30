import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationSnapshotService } from '../services/reservation-snapshot.service';
import { ReservationSnapshot } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto } from '@resource/dtos.index';
import { ReservationSnapshotResponseDto } from '@resource/modules/reservation/application/dtos/reservation-snapshot.dto';
import { DateUtil } from '@libs/utils/date.util';
import { User } from '@libs/entities';

@Injectable()
export class ReservationSnapshotUsecase {
    constructor(private readonly snapshotService: ReservationSnapshotService) {}

    async upsertSnapshot(user: User, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        let snapshot = await this.findSnapshotByUserId(user.userId);
        if (snapshot) {
            return await this.updateSnapshot({ ...dto, snapshotId: snapshot.snapshotId });
        } else {
            return await this.createSnapshot(user, dto);
        }
    }

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
        return snapshot ? this.toResponseDto(snapshot) : null;
    }

    async findAllSnapshots(options?: RepositoryOptions): Promise<ReservationSnapshotResponseDto[]> {
        const snapshots = await this.snapshotService.findAll(options);
        return snapshots.map((snapshot) => this.toResponseDto(snapshot));
    }

    async deleteSnapshot(snapshotId: string): Promise<void> {
        await this.snapshotService.delete(snapshotId);
    }

    private toResponseDto(snapshot: ReservationSnapshot): ReservationSnapshotResponseDto {
        return {
            snapshotId: snapshot.snapshotId,
            userId: snapshot.userId,
            step: snapshot.step,
            resourceType: snapshot.resourceType,
            droppableGroupData: snapshot.droppableGroupData,
            dateRange: snapshot.dateRange,
            startTime: snapshot.startTime,
            endTime: snapshot.endTime,
            timeRange: snapshot.timeRange,
            timeUnit: snapshot.timeUnit,
            selectedResource: snapshot.selectedResource,
            title: snapshot.title,
            reminderTimes: snapshot.reminderTimes,
            isAllDay: snapshot.isAllDay,
            notifyBeforeStart: snapshot.notifyBeforeStart,
            notifyMinutesBeforeStart: snapshot.notifyMinutesBeforeStart,
            attendees: snapshot.attendees,
            createdAt: snapshot.createdAt,
            updatedAt: snapshot.updatedAt,
        };
    }
}
