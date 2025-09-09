import { ApiProperty } from '@nestjs/swagger';

export class ProjectManagerDto {
    @ApiProperty({
        description: '프로젝트 매니저 이름',
        example: '김철수',
        nullable: true,
    })
    name: string | null;
}
