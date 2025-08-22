import { ApiProperty } from '@nestjs/swagger';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';

export class MyScheduleResourceDto {
    @ApiProperty({
        description: '자원 ID',
        example: 'uuid-string',
    })
    resourceId: string;

    @ApiProperty({
        description: '자원 이름',
        example: '회의실 A',
    })
    resourceName: string;

    @ApiProperty({
        description: '자원 타입',
        example: 'MEETING_ROOM',
    })
    resourceType: string;
}

export class MyScheduleProjectDto {
    @ApiProperty({
        description: '프로젝트 ID',
        example: 'uuid-string',
    })
    projectId: string;

    @ApiProperty({
        description: '프로젝트 이름',
        example: '신규 시스템 개발',
    })
    projectName: string;
}

export class MyScheduleItemDto {
    @ApiProperty({
        description: '일정 ID',
        example: 'uuid-string',
    })
    scheduleId: string;

    @ApiProperty({
        description: '일정 제목',
        example: '주간 프로젝트 회의',
    })
    title: string;

    @ApiProperty({
        description: '일정 설명',
        required: false,
        example: '주간 진행사항 점검 및 이슈 논의',
    })
    description?: string;

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
        description: '일정 유형',
        example: '프로젝트',
        enum: ['일정', '프로젝트', '자원'],
    })
    scheduleType: string;

    @ApiProperty({
        description: '관련 프로젝트 정보',
        type: MyScheduleProjectDto,
        required: false,
    })
    project?: MyScheduleProjectDto;

    @ApiProperty({
        description: '관련 자원 정보',
        type: MyScheduleResourceDto,
        required: false,
    })
    resource?: MyScheduleResourceDto;
}

export class MyScheduleResponseDto {
    @ApiProperty({
        description: '일정 목록',
        type: [MyScheduleItemDto],
    })
    schedules: MyScheduleItemDto[];
}
