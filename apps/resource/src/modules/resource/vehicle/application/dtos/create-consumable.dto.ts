import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateConsumableDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  replaceCycle: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  notifyReplacementCycle: boolean;

  @ApiProperty({
    description: '차량 ID',
    example: 'vehicle-123'
  })
  vehicleId: string;
} 