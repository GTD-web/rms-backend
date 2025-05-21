import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AccommodationInfoRepositoryPort } from '@resource/modules/resource/accommodation/domain/ports/accommodation-info.repository.port';
import { AccommodationInfo } from '@resource/modules/resource/accommodation/domain/models/accommodation-info';
import { CreateAccommodationInfoDto } from '../dtos/create-accommodation-info.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
@Injectable()
export class AccommodationInfoService {
  constructor(
    @Inject('AccommodationInfoRepositoryPort')
    private readonly accommodationInfoRepository: AccommodationInfoRepositoryPort,
  ) {}

  async create(createDto: CreateAccommodationInfoDto & { resourceId: string }, repositoryOptions?: RepositoryOptions) {
    const accommodationInfo = new AccommodationInfo({
      resourceId: createDto.resourceId,
    });
    return this.accommodationInfoRepository.save(accommodationInfo, repositoryOptions);
  }

  async findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions) {
    const info = await this.accommodationInfoRepository.findByResourceId(resourceId, repositoryOptions);
    if (!info) {
      throw new NotFoundException('Accommodation info not found');
    }
    return info;
  }

  async update(resourceId: string, updateData: Partial<CreateAccommodationInfoDto>, repositoryOptions?: RepositoryOptions) {
    const info = await this.findByResourceId(resourceId, repositoryOptions);
    return this.accommodationInfoRepository.update(resourceId, {
      ...info,
      ...updateData,
    }, repositoryOptions);
  }

  async remove(resourceId: string, repositoryOptions?: RepositoryOptions) {
    await this.accommodationInfoRepository.delete(resourceId, repositoryOptions);
  }
} 