import { MeetingRoomInfo } from '../models/meeting-room-info';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface MeetingRoomInfoRepositoryPort {
  save(meetingRoomInfo: MeetingRoomInfo | Partial<MeetingRoomInfo>, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo>;
  findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo | null>;
  update(resourceId: string, meetingRoomInfo: Partial<MeetingRoomInfo>, repositoryOptions?: RepositoryOptions): Promise<MeetingRoomInfo>;
  delete(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
} 