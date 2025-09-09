import { ApiProperty } from '@nestjs/swagger';

export class ProjectLevelDto {
    @ApiProperty({
        description: '프로젝트 레벨 제목',
        example: '상위 프로젝트',
    })
    title: string;
}
