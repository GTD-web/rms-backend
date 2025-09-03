import { Injectable } from '@nestjs/common';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';

@Injectable()
export class DeleteSnapshotUsecase {
    constructor(private readonly snapshotService: DomainReservationSnapshotService) {}

    async execute(snapshotId: string): Promise<void> {
        await this.snapshotService.delete(snapshotId);
    }
}
