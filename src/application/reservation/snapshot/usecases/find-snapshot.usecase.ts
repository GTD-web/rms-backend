import { Injectable } from '@nestjs/common';
import { ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
import { ConvertSnapshotUsecase } from './convert-snapshot.usecase';

@Injectable()
export class FindSnapshotUsecase {
    constructor(
        private readonly snapshotService: DomainReservationSnapshotService,
        private readonly convertSnapshotUsecase: ConvertSnapshotUsecase,
    ) {}

    async execute(employeeId: string): Promise<ReservationSnapshotResponseDto> {
        const snapshot = await this.snapshotService.findOne({
            where: { employeeId },
        });
        return snapshot ? this.convertSnapshotUsecase.execute(snapshot) : null;
    }
}
