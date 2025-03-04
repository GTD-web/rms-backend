import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    userId: string;

    @ApiProperty({
        example: 'test@lumir.space',
    })
    email: string;

    @ApiProperty({
        example: '01012345678',
    })
    mobile: string;

    @ApiProperty({
        example: '홍길동',
    })
    name: string;

    @ApiProperty({
        example: 'Web 파트',
    })
    department: string;

    @ApiProperty({
        example: '연구원',
    })
    position: string;

    @ApiProperty({
        example: ['USER', 'RESOURCE_ADMIN', 'SYSTEM_ADMIN'],
    })
    roles: string[];
}
