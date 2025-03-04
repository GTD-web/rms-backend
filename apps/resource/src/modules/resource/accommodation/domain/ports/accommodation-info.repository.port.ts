import { AccommodationInfo } from '../models/accommodation-info';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface AccommodationInfoRepositoryPort {
  save(accommodationInfo: AccommodationInfo, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo>;
  findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo | null>;
  update(resourceId: string, accommodationInfo: Partial<AccommodationInfo>, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo>;
  delete(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
} 