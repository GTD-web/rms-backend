import { ApiProperty } from '@nestjs/swagger';

export class FcmSubscribeResponseDto {
    @ApiProperty({
        description: '구독 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 메시지',
        example: 'FCM 토큰이 성공적으로 등록되었습니다.',
    })
    message: string;

    @ApiProperty({
        description: '구독 ID (선택적)',
        required: false,
        example: 'sub_12345',
    })
    subscriptionId?: string;
}
