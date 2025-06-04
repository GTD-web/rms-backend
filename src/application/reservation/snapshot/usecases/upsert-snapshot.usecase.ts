import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { FindSnapshotUsecase } from './find-snapshot.usecase';
import { CreateSnapshotUsecase } from './create-snapshot.usecase';
import { UpdateSnapshotUsecase } from './update-snapshot.usecase';
import { CreateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';

@Injectable()
export class UpsertSnapshotUsecase {
    constructor(
        private readonly findSnapshotUsecase: FindSnapshotUsecase,
        private readonly createSnapshotUsecase: CreateSnapshotUsecase,
        private readonly updateSnapshotUsecase: UpdateSnapshotUsecase,
    ) {}

    async execute(user: Employee, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        const snapshot = await this.findSnapshotUsecase.execute(user.employeeId);
        if (snapshot) {
            return await this.updateSnapshotUsecase.execute({ ...dto, snapshotId: snapshot.snapshotId });
        } else {
            return await this.createSnapshotUsecase.execute(user, dto);
        }
    }
}
