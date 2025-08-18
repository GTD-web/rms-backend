import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRelationRepository } from './schedule-relation.repository';
import { BaseService } from '@libs/services/base.service';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';

@Injectable()
export class DomainScheduleRelationService extends BaseService<ScheduleRelation> {
    constructor(private readonly scheduleRelationRepository: DomainScheduleRelationRepository) {
        super(scheduleRelationRepository);
    }

    async findByScheduleRelationId(scheduleRelationId: string): Promise<ScheduleRelation> {
        const scheduleRelation = await this.scheduleRelationRepository.findOne({
            where: { scheduleRelationId },
        });
        return scheduleRelation;
    }

    async findByScheduleId(scheduleId: string): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { scheduleId },
        });
    }

    async findByReservationId(reservationId: string): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { reservationId },
        });
    }

    async findByProjectId(projectId: string): Promise<ScheduleRelation[]> {
        return this.scheduleRelationRepository.findAll({
            where: { projectId },
        });
    }
}
