import { ApiProperty } from '@nestjs/swagger';

export class PushSubscriptionDto {
  @ApiProperty()
  endpoint: string;

  @ApiProperty()
  expirationTime: number | null;

  @ApiProperty({ type: 'object' })
  keys: {
    p256dh: string;
    auth: string;
  };
} 