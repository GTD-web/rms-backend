import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FcmTokenResponseDto {
    @ApiProperty({
        description: '직원 ID',
        example: 'emp123',
    })
    employeeId: string;

    @ApiProperty({
        description: '사번',
        example: 'E2023001',
    })
    employeeNumber: string;

    @ApiPropertyOptional({
        description: 'FCM 토큰 (없으면 null)',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    fcmToken?: string;

    @ApiProperty({
        description: '토큰 마지막 업데이트 시간',
        example: '2024-01-01T00:00:00.000Z',
    })
    updatedAt: Date;
}
