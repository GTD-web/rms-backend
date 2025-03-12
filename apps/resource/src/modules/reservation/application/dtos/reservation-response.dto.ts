import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Reservation } from '@libs/entities';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { EmployeeResponseDto, ResourceResponseDto } from '@resource/dtos.index';

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

    @ApiProperty({ enum: ReservationStatus, required: false })
    status?: ReservationStatus;

    @ApiProperty({ required: false })
    isAllDay?: boolean;

    @ApiProperty({ required: false })
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number] })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false })
    isMine?: boolean;
}

export class ReservationParticipantResponseDto {
    @ApiProperty()
    participantId: string;

    @ApiProperty()
    employeeId: string;

    @ApiProperty()
    type: string;

    @ApiProperty({ type: () => EmployeeResponseDto, required: false })
    employee?: EmployeeResponseDto;
}

export class ReservationWithResourceResponseDto extends ReservationResponseDto {
    constructor(reservation: Reservation) {
        super(reservation);
        this.resource = reservation.resource;
    }

    @ApiProperty({ type: () => ResourceResponseDto, required: false })
    resource?: ResourceResponseDto;
}

export class ReservationWithRelationsResponseDto extends ReservationResponseDto {
    constructor(reservation: Reservation) {
        super(reservation);
        this.resource = reservation.resource;
        this.reservers = reservation.participants?.filter(
            (participant) => participant.type === ParticipantsType.RESERVER,
        );
        this.participants = reservation.participants?.filter(
            (participant) => participant.type === ParticipantsType.PARTICIPANT,
        );
    }

    @ApiProperty({ type: () => ResourceResponseDto, required: false })
    resource?: ResourceResponseDto;

    @ApiProperty({ type: [ReservationParticipantResponseDto], required: false })
    reservers?: ReservationParticipantResponseDto[];

    @ApiProperty({ type: [ReservationParticipantResponseDto], required: false })
    participants?: ReservationParticipantResponseDto[];
}

export class CreateReservationResponseDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    reservationId: string;
}
