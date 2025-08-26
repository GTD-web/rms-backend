import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@libs/enums/resource-type.enum';

export class ResourceScheduleItemDto {
    @ApiProperty({
        description: '일정 ID',
        example: 'uuid-string',
    })
    scheduleId: string;

    @ApiProperty({
        description: '일정 제목',
        example: '프로젝트 회의',
    })
    title: string;

    @ApiProperty({
        description: '일정 설명',
        required: false,
        example: '주간 진행사항 점검',
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
        description: '예약자 이름',
        example: '홍길동',
    })
    reserverName: string;

    @ApiProperty({
        description: '내 일정 여부',
        example: true,
    })
    isMine: boolean;
}

export class ResourceInfoDto {
    @ApiProperty({
        description: '자원 ID',
        example: 'uuid-string',
    })
    resourceId: string;

    @ApiProperty({
        description: '자원명',
        example: '회의실 A',
    })
    resourceName: string;

    @ApiProperty({
        description: '자원 설명',
        required: false,
        example: '10인용 대회의실',
    })
    resourceDescription?: string;

    @ApiProperty({
        description: '자원 사용 가능 여부',
        required: false,
        example: true,
    })
    isAvailable?: boolean;

    @ApiProperty({
        description: '자원 사용 불가능 이유',
        required: false,
        example: '자원 사용 불가능',
    })
    unavailableReason?: string;

    @ApiProperty({
        description: '해당 자원의 일정 목록',
        type: [ResourceScheduleItemDto],
    })
    schedules: ResourceScheduleItemDto[];
}

export class ResourceGroupDto {
    @ApiProperty({
        description: '자원 그룹 ID',
        example: 'uuid-string',
    })
    resourceGroupId: string;

    @ApiProperty({
        description: '자원 그룹명',
        example: '본사 회의실',
    })
    resourceGroupName: string;

    @ApiProperty({
        description: '자원 그룹 설명',
        required: false,
        example: '본사 건물 내 회의실 그룹',
    })
    resourceGroupDescription?: string;

    @ApiProperty({ description: '자원 그룹 순서', example: 1 })
    order: number;

    @ApiProperty({
        description: '해당 그룹의 자원 목록',
        type: [ResourceInfoDto],
    })
    resources: ResourceInfoDto[];
}

export class ResourceScheduleResponseDto {
    @ApiProperty({ description: '자원 유형', enum: ResourceType, example: ResourceType.MEETING_ROOM })
    type: ResourceType;

    @ApiProperty({
        description: '자원 그룹별 일정 목록',
        type: [ResourceGroupDto],
    })
    resourceGroups: ResourceGroupDto[];
}
