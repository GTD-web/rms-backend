import { Injectable } from '@nestjs/common';
import { ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { ReservationSnapshot } from '@libs/entities';

@Injectable()
export class ConvertSnapshotUsecase {
    execute(snapshot: ReservationSnapshot): ReservationSnapshotResponseDto {
        return {
            snapshotId: snapshot.snapshotId,
            employeeId: snapshot.employeeId,
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
