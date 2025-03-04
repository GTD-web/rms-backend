import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Reservation } from '@libs/entities';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ResourceResponseDto } from '@resource/dtos.index';
export class ReservationParticipantResponseDto {
    @ApiProperty()
    participantId: string;

    @ApiProperty()
    employeeId: string;

    @ApiProperty()
    type: string;
}

export class ScheduleResponseDto {
    @ApiProperty()
    scheduleId: string;

    @ApiProperty()
    year: string;

    @ApiProperty()
    month: string;

    @ApiProperty()
    day: string;

    @ApiProperty()
    startDateTime: string;

    @ApiProperty()
    endDateTime: string;
}

export class ReservationResponseDto {
    constructor(reservation: Reservation) {
        this.reservationId = reservation.reservationId;
        this.resourceId = reservation.resourceId;
        this.title = reservation.title;
        this.description = reservation.description;
        this.startDate = reservation.startDate;
        this.endDate = reservation.endDate;
        this.status = reservation.status;
        this.isAllDay = reservation.isAllDay;
        this.notifyBeforeStart = reservation.notifyBeforeStart;
        this.notifyMinutesBeforeStart = reservation.notifyMinutesBeforeStart;
        this.reservers = reservation.participants?.filter(
            (participant) => participant.type === ParticipantsType.RESERVER,
        );
        this.participants = reservation.participants?.filter(
            (participant) => participant.type === ParticipantsType.PARTICIPANT,
        );
        this.schedules = reservation.schedules;
        this.resource = reservation.resource;
    }

    @ApiProperty()
    reservationId: string;

    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    startDate?: string;

    @ApiProperty({ required: false })
    endDate?: string;

    @ApiProperty({ required: false })
    status?: ReservationStatus;

    @ApiProperty({ required: false })
    isAllDay?: boolean;

    @ApiProperty({ required: false })
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number] })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false })
    resource?: ResourceResponseDto;

    @ApiProperty({ type: [ReservationParticipantResponseDto], required: false })
    reservers?: ReservationParticipantResponseDto[];

    @ApiProperty({ type: [ReservationParticipantResponseDto], required: false })
    participants?: ReservationParticipantResponseDto[];

    @ApiProperty({ type: [ScheduleResponseDto], required: false })
    schedules?: ScheduleResponseDto[];
}
