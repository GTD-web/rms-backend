import { ApiProperty } from '@nestjs/swagger';

export class ConsumableResponseDto {
  @ApiProperty()
  consumableId: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  replacementDate: Date;

  @ApiProperty()
  mileage: number;

  @ApiProperty({ required: false })
  nextReplacementDate?: Date;
} 