import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAccommodationInfoDto {
  // resourceId는 CreateResourceRequestDto를 통해 전달되므로 제거
  // 필요한 숙소 관련 필드들 추가
} 