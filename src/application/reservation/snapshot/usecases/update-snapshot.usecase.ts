import { Injectable } from '@nestjs/common';
import { UpdateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
import { ConvertSnapshotUsecase } from './convert-snapshot.usecase';

@Injectable()
export class UpdateSnapshotUsecase {
    constructor(
        private readonly snapshotService: DomainReservationSnapshotService,
        private readonly convertSnapshotUsecase: ConvertSnapshotUsecase,
    ) {}

    async execute(dto: UpdateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto> {
        const updateData = {
            ...dto,
            dateRange: dto.dateRange
                ? {
                      from: new Date(dto.dateRange.from),
                      to: new Date(dto.dateRange.to),
                  }
                : undefined,
            selectedResource: dto.selectedResource
                ? {
                      ...dto.selectedResource,
                      startDate: new Date(dto.selectedResource.startDate),
                      endDate: new Date(dto.selectedResource.endDate),
                  }
                : undefined,
        };
        const updatedSnapshot = await this.snapshotService.update(dto.snapshotId, updateData);
        return this.convertSnapshotUsecase.execute(updatedSnapshot);
    }
}
