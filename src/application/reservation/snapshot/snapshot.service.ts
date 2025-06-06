import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import {
    CreateReservationSnapshotDto,
    UpdateReservationSnapshotDto,
    ReservationSnapshotResponseDto,
} from './dtos/reservation-snapshot.dto';
import { UpdateSnapshotUsecase } from './usecases/update-snapshot.usecase';
import { FindSnapshotUsecase } from './usecases/find-snapshot.usecase';
import { DeleteSnapshotUsecase } from './usecases/delete-snapshot.usecase';
import { UpsertSnapshotUsecase } from './usecases/upsert-snapshot.usecase';

@Injectable()
export class SnapshotService {
    constructor(
        private readonly updateSnapshotUsecase: UpdateSnapshotUsecase,
        private readonly findSnapshotUsecase: FindSnapshotUsecase,
        private readonly deleteSnapshotUsecase: DeleteSnapshotUsecase,
        private readonly upsertSnapshotUsecase: UpsertSnapshotUsecase,
    ) {}

    async createSnapshot(
        user: Employee,
        createSnapshotDto: CreateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.upsertSnapshotUsecase.execute(user, createSnapshotDto);
    }

    async updateSnapshot(
        user: Employee,
        updateSnapshotDto: UpdateReservationSnapshotDto,
    ): Promise<ReservationSnapshotResponseDto> {
        return this.updateSnapshotUsecase.execute(updateSnapshotDto);
    }

    async findUserSnapshot(user: Employee): Promise<ReservationSnapshotResponseDto> {
        return this.findSnapshotUsecase.execute(user.employeeId);
    }

    async deleteSnapshot(user: Employee, snapshotId: string): Promise<void> {
        await this.deleteSnapshotUsecase.execute(snapshotId);
    }
}
