import { ApiProperty } from '@nestjs/swagger';
import { ProjectManagerDto } from './project-manager.dto';
import { ProjectLevelDto } from './project-level.dto';

export class ProjectDataDto {
    @ApiProperty({
        description: '프로젝트 고유 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: '프로젝트 이름',
        example: '루미르 통합 포탈 개발',
    })
    projectName: string;

    @ApiProperty({
        description: '프로젝트 코드',
        example: 'LUMIR-2024-001',
        nullable: true,
    })
    projectCode: string | null;

    @ApiProperty({
        description: '프로젝트 매니저 정보',
        type: ProjectManagerDto,
    })
    projectManager: ProjectManagerDto;

    @ApiProperty({
        description: '프로젝트 레벨 정보',
        type: ProjectLevelDto,
    })
    projectLevel: ProjectLevelDto;

    @ApiProperty({
        description: '상위 프로젝트 ID',
        example: '456e7890-e89b-12d3-a456-426614174001',
        nullable: true,
    })
    parentProjectId: string | null;
}
