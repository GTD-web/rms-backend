import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { CreateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
import { ConvertSnapshotUsecase } from './convert-snapshot.usecase';

@Injectable()
export class CreateSnapshotUsecase {
    constructor(
        private readonly snapshotService: DomainReservationSnapshotService,
        private readonly convertSnapshotUsecase: ConvertSnapshotUsecase,
    ) {}

    async execute(user: Employee, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        const snapshot = await this.snapshotService.create(dto);
        snapshot.employeeId = user.employeeId;
        const savedSnapshot = await this.snapshotService.save(snapshot);
        return this.convertSnapshotUsecase.execute(savedSnapshot);
    }
}
