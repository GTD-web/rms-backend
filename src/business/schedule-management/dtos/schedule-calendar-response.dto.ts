import { ApiProperty } from '@nestjs/swagger';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';

export class ReservationDto {
    @ApiProperty({
        description: '자원 예약 ID',
        example: 'uuid-string',
    })
    reservationId: string;

    @ApiProperty({
        description: '자원 이름',
        example: '자원 1',
    })
    resourceName: string;

    @ApiProperty({
        description: '자원 타입',
        example: '자원 1',
    })
    resourceType: string;
}

export class ProjectDto {
    @ApiProperty({
        description: '프로젝트 ID',
        example: 'uuid-string',
    })
    projectId: string;
}

export class ScheduleCalendarItemDto {
    @ApiProperty({
        description: '일정 ID',
        example: 'uuid-string',
    })
    scheduleId: string;

    @ApiProperty({
        description: '일정 제목',
        example: '프로젝트 회의',
    })
    scheduleTitle: string;

    @ApiProperty({
        description: '시작 날짜 및 시간',
        example: '2024-01-15T09:00:00Z',
    })
    startDate: Date;

    @ApiProperty({
        description: '종료 날짜 및 시간',
        example: '2024-01-15T10:00:00Z',
    })
    endDate: Date;

    @ApiProperty({
        description: '예약자 정보',
        example: '홍길동',
    })
    reserverName: string;

    @ApiProperty({
        description: '프로젝트 정보',
        example: '프로젝트 1',
        required: false,
    })
    project?: ProjectDto;

    @ApiProperty({
        description: '자원 예약 정보',
        example: '자원 예약 1',
        required: false,
    })
    reservation?: ReservationDto;

    @ApiProperty({
        description: '안읽은 알림 여부',
        example: true,
        required: false,
    })
    hasUnreadNotification?: boolean;
}

export class ScheduleCalendarResponseDto {
    @ApiProperty({
        description: '일정 목록',
        type: [ScheduleCalendarItemDto],
    })
    schedules: ScheduleCalendarItemDto[];
}
