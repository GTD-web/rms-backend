import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
    @ApiProperty({ example: 'admin@lumir.space' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ example: '1234' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
