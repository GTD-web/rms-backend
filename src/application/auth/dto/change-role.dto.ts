import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class ChangeRoleDto {
    @ApiProperty({
        example: 'userId',
        description: '유저 아이디',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        example: true,
        description: '자원 담당자 여부',
    })
    @IsBoolean()
    @IsNotEmpty()
    isResourceAdmin: boolean;
}
