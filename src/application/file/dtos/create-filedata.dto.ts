import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDataDto {
    @ApiProperty({ description: '파일 이름' })
    fileName: string;

    @ApiProperty({ description: '파일 경로' })
    filePath: string;
}
