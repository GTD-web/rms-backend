import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRelationRepository } from './schedule-relation.repository';
import { BaseService } from '@libs/services/base.service';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { In } from 'typeorm';

@Injectable()
export class DomainScheduleRelationService extends BaseService<ScheduleRelation> {
    constructor(private readonly scheduleRelationRepository: DomainScheduleRelationRepository) {
        super(scheduleRelationRepository);
    }

    async findByScheduleIds(scheduleIds: string[]): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }
}
