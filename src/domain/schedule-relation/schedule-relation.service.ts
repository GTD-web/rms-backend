import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRelationRepository } from './schedule-relation.repository';
import { BaseService } from '@libs/services/base.service';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class DomainScheduleRelationService extends BaseService<ScheduleRelation> {
    constructor(private readonly scheduleRelationRepository: DomainScheduleRelationRepository) {
        super(scheduleRelationRepository);
    }

    async findByScheduleId(scheduleId: string): Promise<ScheduleRelation> {
        return this.scheduleRelationRepository.findOne({
            where: { scheduleId },
        });
    }

    async findByScheduleIds(scheduleIds: string[]): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }

    async findByReservationIds(reservationIds: string[]): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { reservationId: In(reservationIds) },
        });
    }
}
