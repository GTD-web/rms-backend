import { ApiProperty } from '@nestjs/swagger';

export class VehicleInfoResponseDto {
  @ApiProperty()
  vehicleInfoId: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  insuranceName: string;

  @ApiProperty()
  insuranceNumber: string;

  @ApiProperty()
  totalMileage: number;

  @ApiProperty()
  leftMileage: number;

  @ApiProperty()
  parkingLocationImages: string[];

  @ApiProperty()
  odometerImages: string[];
} 