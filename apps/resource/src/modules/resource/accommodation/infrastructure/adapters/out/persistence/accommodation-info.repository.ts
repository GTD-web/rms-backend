import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccommodationInfo as AccommodationInfoEntity } from '@libs/entities';
import { AccommodationInfo } from '@resource/modules/resource/accommodation/domain/models/accommodation-info';
import { AccommodationInfoRepositoryPort } from '@resource/modules/resource/accommodation/domain/ports/accommodation-info.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class AccommodationInfoRepository implements AccommodationInfoRepositoryPort {
  constructor(
    @InjectRepository(AccommodationInfoEntity)
    private readonly repository: Repository<AccommodationInfoEntity>,
  ) {}

  async save(accommodationInfo: AccommodationInfo, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo> {
    const entity = this.toEntity(accommodationInfo);
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(AccommodationInfoEntity) : this.repository;
    const savedEntity = await repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findByResourceId(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo | null> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(AccommodationInfoEntity) : this.repository;
    const entity = await repository.findOne({ where: { resourceId } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(resourceId: string, accommodationInfo: Partial<AccommodationInfo>, repositoryOptions?: RepositoryOptions): Promise<AccommodationInfo> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(AccommodationInfoEntity) : this.repository;
    await repository.update({ resourceId }, this.toEntity(accommodationInfo));
    const updated = await repository.findOne({ where: { resourceId } });
    if (!updated) throw new NotFoundException('Accommodation info not found');
    return this.toDomain(updated);
  }

  async delete(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void> {
    const repository = repositoryOptions?.queryRunner ? repositoryOptions.queryRunner.manager.getRepository(AccommodationInfoEntity) : this.repository;
    await repository.delete({ resourceId });
  }

  private toDomain(entity: AccommodationInfoEntity): AccommodationInfo {
    return new AccommodationInfo({
      accommodationInfoId: entity.accommodationInfoId,
      resourceId: entity.resourceId,
    });
  }

  private toEntity(domain: AccommodationInfo | Partial<AccommodationInfo>): Partial<AccommodationInfoEntity> {
    const props = domain instanceof AccommodationInfo ? domain.toJSON() : domain;
    return {
      accommodationInfoId: props.accommodationInfoId,
      resourceId: props.resourceId,
    };
  }
} 