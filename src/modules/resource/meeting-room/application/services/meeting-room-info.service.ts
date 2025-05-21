import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MeetingRoomInfoRepositoryPort } from '@resource/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port';
import { MeetingRoomInfo } from '@resource/modules/resource/meeting-room/domain/models/meeting-room-info';
import { CreateMeetingRoomInfoDto } from '../dtos/create-meeting-room-info.dto';

@Injectable()
export class MeetingRoomInfoService {
  constructor(
    @Inject('MeetingRoomInfoRepositoryPort')
    private readonly meetingRoomInfoRepository: MeetingRoomInfoRepositoryPort,
  ) {}

  async create(createDto: CreateMeetingRoomInfoDto & { resourceId: string }) {
    const meetingRoomInfo = new MeetingRoomInfo({
      resourceId: createDto.resourceId,
    });
    return this.meetingRoomInfoRepository.save(meetingRoomInfo);
  }

  async findByResourceId(resourceId: string) {
    const info = await this.meetingRoomInfoRepository.findByResourceId(resourceId);
    if (!info) {
      throw new NotFoundException('Meeting room info not found');
    }
    return info;
  }

  async update(resourceId: string, updateData: Partial<CreateMeetingRoomInfoDto>) {
    const info = await this.findByResourceId(resourceId);
    return this.meetingRoomInfoRepository.update(resourceId, {
      ...info,
      ...updateData,
    });
  }

  async remove(resourceId: string) {
    await this.meetingRoomInfoRepository.delete(resourceId);
  }
} 