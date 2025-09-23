import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({
        description: '에러 타입',
        example: 'Bad Request',
    })
    error: string;

    @ApiProperty({
        description: '에러 메시지',
        example: 'ids 파라미터가 필요합니다.',
    })
    message: string;

    @ApiProperty({
        description: '에러 상세 정보',
        example: 'Invalid UUID format',
        required: false,
    })
    details?: string;
}
