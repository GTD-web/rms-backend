import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccommodationInfoService } from '@resource/modules/resource/accommodation/application/services/accommodation-info.service';
import { CreateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/create-accommodation-info.dto';

@ApiTags('accommodation-info')
@Controller('resources/:resourceId/accommodation-info')
export class AccommodationInfoController {
  constructor(private readonly accommodationInfoService: AccommodationInfoService) {}

  // @Get()
  // @ApiOperation({ summary: '숙소 정보 조회' })
  // findByResourceId(@Param('resourceId') resourceId: string) {
  //   return this.accommodationInfoService.findByResourceId(resourceId);
  // }

  // @Put()
  // @ApiOperation({ summary: '숙소 정보 수정' })
  // update(
  //   @Param('resourceId') resourceId: string,
  //   @Body() updateAccommodationInfoDto: Partial<CreateAccommodationInfoDto>
  // ) {
  //   return this.accommodationInfoService.update(resourceId, updateAccommodationInfoDto);
  // }

  // @Delete()
  // @ApiOperation({ summary: '숙소 정보 삭제' })
  // remove(@Param('resourceId') resourceId: string) {
  //   return this.accommodationInfoService.remove(resourceId);
  // }
} 