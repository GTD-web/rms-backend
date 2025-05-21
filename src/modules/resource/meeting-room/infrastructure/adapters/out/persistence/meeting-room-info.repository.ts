import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetingRoomInfo as MeetingRoomInfoEntity } from '@libs/entities';
import { MeetingRoomInfo } from '@resource/modules/resource/meeting-room/domain/models/meeting-room-info';
import { MeetingRoomInfoRepositoryPort } from '@resource/modules/resource/meeting-room/domain/ports/meeting-room-info.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class MeetingRoomInfoRepository implements MeetingRoomInfoRepositoryPort {
  constructor(
    @InjectRepository(MeetingRoomInfoEntity)
    private readonly repository: Repository<MeetingRoomInfoEntity>,
  ) {}

  async save(meetingRoomInfo: MeetingRoomInfo, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo> {
    const entity = this.toEntity(meetingRoomInfo);
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(MeetingRoomInfoEntity) : this.repository;
    const savedEntity = await repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo | null> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(MeetingRoomInfoEntity) : this.repository;
    const entity = await repository.findOne({ where: { resourceId } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(resourceId: string, meetingRoomInfo: Partial<MeetingRoomInfo>, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(MeetingRoomInfoEntity) : this.repository;
    await repository.update({ resourceId }, this.toEntity(meetingRoomInfo));
    const updated = await this.findByResourceId(resourceId, repositoryOptions);
    if (!updated) throw new NotFoundException('Meeting room info not found');
    return updated;
  }

  async delete(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(MeetingRoomInfoEntity) : this.repository;
    await repository.delete({ resourceId });
  }

  private toDomain(entity: MeetingRoomInfoEntity): MeetingRoomInfo {
    return new MeetingRoomInfo({
      meetingRoomInfoId: entity.meetingRoomInfoId,
      resourceId: entity.resourceId,
    });
  }

  private toEntity(domain: MeetingRoomInfo | Partial<MeetingRoomInfo>): Partial<MeetingRoomInfoEntity> {
    const props = domain instanceof MeetingRoomInfo ? domain.toJSON() : domain;
    return {
      meetingRoomInfoId: props.meetingRoomInfoId,
      resourceId: props.resourceId,
    };
  }
} 