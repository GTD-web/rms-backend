import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceResponseDto {
  @ApiProperty()
  maintenanceId: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  maintenanceDate: Date;

  @ApiProperty({ required: false })
  maintenanceShop?: string;

  @ApiProperty()
  mileage: number;
} 