import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FcmSubscribeRequestDto {
    @ApiProperty({
        description: 'FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    @IsString()
    @IsNotEmpty()
    fcmToken: string;
}
