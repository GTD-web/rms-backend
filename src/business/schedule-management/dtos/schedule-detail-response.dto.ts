import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { VehicleInfoResponseDto } from '@src/business/resource-management/dtos/vehicle/vehicle-response.dto';
import { MeetingRoomInfoResponseDto } from '@src/application/resource/meeting-room/dtos/meeting-room-info-response.dto';
import { AccommodationInfoResponseDto } from '@src/application/resource/accommodation/dtos/accommodation-info-response.dto';
import { EquipmentInfoResponseDto } from '@src/application/resource/equipment/dtos/equipment-info-response.dto';
import { File } from '@libs/entities/file.entity';

export class ScheduleDetailProjectDto {
    @ApiProperty({
        description: '프로젝트 ID',
        example: 'uuid-string',
    })
    projectId: string;

    @ApiProperty({
        description: '프로젝트 이름 (추후 프로젝트 테이블 구현 시 실제 데이터로 대체)',
        example: '신규 시스템 개발',
    })
    projectName: string;
}

export class ScheduleDetailParticipantDto {
    @ApiProperty({
        description: '참가자 ID',
        example: 'uuid-string',
    })
    participantId: string;

    @ApiProperty({
        description: '직원 ID',
        example: 'uuid-string',
    })
    employeeId: string;

    @ApiProperty({
        description: '직원 이름',
        example: '김철수',
    })
    employeeName: string;

    @ApiProperty({
        description: '참가자 유형 (예약자/참석자)',
        example: 'RESERVER',
    })
    participantType: string;
}

export class ScheduleDetailResourceDto {
    @ApiProperty({
        description: '자원 ID',
        example: 'uuid-string',
    })
    resourceId: string;

    @ApiProperty({
        description: '자원 이름',
        example: '회의실 A',
    })
    name: string;

    @ApiProperty({
        description: '자원 타입',
        enum: ResourceType,
        example: ResourceType.MEETING_ROOM,
    })
    type: ResourceType;

    @ApiProperty({
        description: '자원 설명',
        required: false,
        example: '대형 회의실, 프로젝터 완비',
    })
    description?: string;

    @ApiProperty({
        description: '자원 위치 정보',
        required: false,
        type: 'object',
    })
    location?: {
        address?: string;
        floor?: string;
        room?: string;
        longitude?: number;
        latitude?: number;
    };

    @ApiProperty({
        description: '자원 타입별 상세 정보',
        required: false,
        oneOf: [
            { $ref: getSchemaPath(VehicleInfoResponseDto) },
            { $ref: getSchemaPath(MeetingRoomInfoResponseDto) },
            { $ref: getSchemaPath(AccommodationInfoResponseDto) },
            { $ref: getSchemaPath(EquipmentInfoResponseDto) },
        ],
    })
    typeInfo?:
        | (VehicleInfoResponseDto & {
              files?: {
                  parkingLocationImages: File[];
                  odometerImages: File[];
                  indoorImages: File[];
              };
          })
        | MeetingRoomInfoResponseDto
        | AccommodationInfoResponseDto
        | EquipmentInfoResponseDto;
}

export class ScheduleDetailReservationDto {
    @ApiProperty({
        description: '예약 ID',
        example: 'uuid-string',
    })
    reservationId: string;

    @ApiProperty({
        description: '예약 제목',
        example: '회의실 A 예약',
    })
    title: string;

    @ApiProperty({
        description: '예약 설명',
        required: false,
        example: '주간 회의를 위한 예약',
    })
    description?: string;

    @ApiProperty({
        description: '예약 상태',
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    status: ReservationStatus;

    @ApiProperty({
        description: '자원 정보',
        type: ScheduleDetailResourceDto,
    })
    resource: ScheduleDetailResourceDto;
}

export class ScheduleDetailResponseDto {
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
        enum: ScheduleType,
        example: ScheduleType.COMPANY,
    })
    scheduleType: ScheduleType;

    @ApiProperty({
        description: '시작 전 알림 여부',
        example: true,
    })
    notifyBeforeStart: boolean;

    @ApiProperty({
        description: '시작 전 알림 시점 (분 단위)',
        type: [Number],
        required: false,
        example: [10, 30],
    })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({
        description: '예약자 정보',
        type: ScheduleDetailParticipantDto,
        required: false,
    })
    reserver?: ScheduleDetailParticipantDto;

    @ApiProperty({
        description: '참가자 목록 (예약자 제외)',
        type: [ScheduleDetailParticipantDto],
    })
    participants: ScheduleDetailParticipantDto[];

    @ApiProperty({
        description: '관련 프로젝트 정보 (옵션)',
        type: ScheduleDetailProjectDto,
        required: false,
    })
    project?: ScheduleDetailProjectDto;

    @ApiProperty({
        description: '관련 자원예약 정보 (옵션)',
        type: ScheduleDetailReservationDto,
        required: false,
    })
    reservation?: ScheduleDetailReservationDto;
}
