import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MeetingRoomInfoService } from '@resource/modules/resource/meeting-room/application/services/meeting-room-info.service';
import { CreateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto';

@ApiTags('meeting-room-info')
@Controller('resources/:resourceId/meeting-room-info')
export class MeetingRoomInfoController {
  constructor(private readonly meetingRoomInfoService: MeetingRoomInfoService) {}

  // @Get()
  // @ApiOperation({ summary: '회의실 정보 조회' })
  // findByResourceId(@Param('resourceId') resourceId: string) {
  //   return this.meetingRoomInfoService.findByResourceId(resourceId);
  // }

  // @Put()
  // @ApiOperation({ summary: '회의실 정보 수정' })
  // update(
  //   @Param('resourceId') resourceId: string,
  //   @Body() updateMeetingRoomInfoDto: Partial<CreateMeetingRoomInfoDto>
  // ) {
  //   return this.meetingRoomInfoService.update(resourceId, updateMeetingRoomInfoDto);
  // }

  // @Delete()
  // @ApiOperation({ summary: '회의실 정보 삭제' })
  // remove(@Param('resourceId') resourceId: string) {
  //   return this.meetingRoomInfoService.remove(resourceId);
  // }
} 