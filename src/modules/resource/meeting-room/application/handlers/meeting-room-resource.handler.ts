import { Inject, Injectable } from '@nestjs/common';
import { ResourceTypeHandler } from '@resource/modules/resource/common/domain/ports/resource-type.handler.port';
import { Resource } from '@libs/entities';
import { MeetingRoomInfoService } from '@resource/modules/resource/meeting-room/application/services/meeting-room-info.service';
import { CreateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { MeetingRoomInfoRepositoryPort } from '../../domain/ports/meeting-room-info.repository.port';
import { MeetingRoomInfo } from '../../domain/models/meeting-room-info';

@Injectable()
export class MeetingRoomResourceHandler implements ResourceTypeHandler {
    constructor(
        @Inject('MeetingRoomInfoRepositoryPort')
        private readonly meetingRoomInfoRepository: MeetingRoomInfoRepositoryPort,
    ) {}

    async createTypeInfo(
        resource: Resource,
        typeInfo: CreateMeetingRoomInfoDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        const meetingRoomInfo = new MeetingRoomInfo({
            ...typeInfo,
            resourceId: resource.resourceId,
        });

        await this.meetingRoomInfoRepository.save(meetingRoomInfo, repositoryOptions);
    }

    async getTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<any> {
        return this.meetingRoomInfoRepository.findByResourceId(resourceId, repositoryOptions);
    }

    async updateTypeInfo(
        resource: Resource,
        typeInfo: Partial<CreateMeetingRoomInfoDto>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<void> {
        await this.meetingRoomInfoRepository.update(resource.resourceId, typeInfo, repositoryOptions);
    }

    async deleteTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
        await this.meetingRoomInfoRepository.delete(resourceId, repositoryOptions);
    }

    async validateTypeData(typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<boolean> {
        // 알림 관련 필드가 Resource로 이동했으므로 여기서는 검증할 필요 없음
        return true;
    }
}
