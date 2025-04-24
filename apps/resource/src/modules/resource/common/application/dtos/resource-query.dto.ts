import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';

export class ResourceQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional({
        description: '리소스 타입',
        enum: ResourceType,
        example: ResourceType.MEETING_ROOM,
    })
    @IsEnum(ResourceType)
    resourceType: ResourceType;

    @ApiPropertyOptional({
        description: '리소스 그룹 ID',
        example: 'ca33f67a-a9c2-4a29-b266-3d82f9aa7fe4',
    })
    @IsString()
    resourceGroupId: string;

    @ApiPropertyOptional({
        description: '시작 날짜',
        example: '2024-01-01',
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({
        description: '종료 날짜',
        example: '2024-01-31',
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiPropertyOptional({
        description: '시작 시간',
        example: '09:00:00',
    })
    @IsOptional()
    @IsString()
    startTime?: string;

    @ApiPropertyOptional({
        description: '종료 시간',
        example: '18:00:00',
    })
    @IsOptional()
    @IsString()
    endTime?: string;

    @ApiPropertyOptional({
        description: '오전 시간대 필터',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    am?: boolean;

    @ApiPropertyOptional({
        description: '오후 시간대 필터',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    pm?: boolean;

    @ApiPropertyOptional({
        description: '이용 시간 단위(분)',
        example: 30,
        minimum: 1,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    timeUnit?: number;
}
