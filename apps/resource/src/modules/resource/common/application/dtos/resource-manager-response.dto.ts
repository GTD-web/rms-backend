import { ApiProperty } from '@nestjs/swagger';

export class ResourceManagerResponseDto {
  @ApiProperty()
  resourceManagerId: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  employeeId: string;
}