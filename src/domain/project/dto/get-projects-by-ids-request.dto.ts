import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GetProjectsByIdsRequestDto {
    @ApiProperty({
        description: '조회할 프로젝트 ID 배열',
        example: ['123e4567-e89b-12d3-a456-426614174000', '456e7890-e89b-12d3-a456-426614174001'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    ids: string[];
}
