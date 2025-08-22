import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRepository } from './schedule.repository';
import { BaseService } from '@libs/services/base.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { MoreThanOrEqual, LessThanOrEqual, Between, In } from 'typeorm';

@Injectable()
export class DomainScheduleService extends BaseService<Schedule> {
    constructor(private readonly scheduleRepository: DomainScheduleRepository) {
        super(scheduleRepository);
    }
    async findByDateRange(startDate: Date, endDate: Date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: {
                startDate: LessThanOrEqual(endDate),
                endDate: MoreThanOrEqual(startDate),
            },
        });
    }

    async findByScheduleIds(scheduleIds: string[]): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }
}
