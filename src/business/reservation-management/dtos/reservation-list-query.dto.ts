import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsArray, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DateUtil } from '@libs/utils/date.util';

export enum ReservationSortOrder {
    DESC = 'DESC', // 최신순
    ASC = 'ASC', // 오래된순
    // START_DATE_ASC = 'START_DATE_ASC', // 시작일 오름차순
    // START_DATE_DESC = 'START_DATE_DESC', // 시작일 내림차순
}

export class ReservationListQueryDto {
    @ApiPropertyOptional({
        description: '검색 키워드 (자원명, 예약자명, 설명 등)',
        example: '회의실',
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    keyword?: string;

    @ApiPropertyOptional({
        description: '페이지 번호',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value) || 1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: '페이지당 항목 수',
        example: 20,
        default: 20,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value) || 20)
    limit?: number = 20;

    @ApiPropertyOptional({
        description: '시작일 (YYYY-MM-DD)',
        example: DateUtil.now().addDays(-20).format('YYYY-MM-DD'),
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({
        description: '종료일 (YYYY-MM-DD)',
        example: DateUtil.now().addDays(30).format('YYYY-MM-DD'),
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiPropertyOptional({
        description: '자원 타입',
        enum: ResourceType,
        example: ResourceType.MEETING_ROOM,
    })
    @IsOptional()
    @IsEnum(ResourceType)
    resourceType?: ResourceType;

    @ApiPropertyOptional({
        description: '예약 상태 (다중 선택 가능)',
        enum: ReservationStatus,
        // isArray: true,
        example: [ReservationStatus.CONFIRMED, ReservationStatus.PENDING],
    })
    @IsOptional()
    @IsArray()
    @IsEnum(ReservationStatus, { each: true })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map((item) => item.trim());
        }
        return value;
    })
    status?: ReservationStatus[];

    @ApiPropertyOptional({
        description: '정렬 순서',
        enum: ReservationSortOrder,
        example: ReservationSortOrder.DESC,
        default: ReservationSortOrder.DESC,
    })
    @IsOptional()
    @IsEnum(ReservationSortOrder)
    sortOrder?: ReservationSortOrder = ReservationSortOrder.DESC;

    @ApiPropertyOptional({
        description: '특정 자원 ID (deprecated - resourceType 사용 권장)',
        example: '78117aaf-a203-43a3-bb38-51ec91ca935a',
    })
    @IsOptional()
    @IsString()
    resourceId?: string;
}
