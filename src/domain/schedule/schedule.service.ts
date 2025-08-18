import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRepository } from './schedule.repository';
import { BaseService } from '@libs/services/base.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';

@Injectable()
export class DomainScheduleService extends BaseService<Schedule> {
    constructor(private readonly scheduleRepository: DomainScheduleRepository) {
        super(scheduleRepository);
    }

    async findByScheduleId(scheduleId: string): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            where: { scheduleId },
            relations: ['participants'],
        });
        return schedule;
    }

    async findByTitle(title: string): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { title },
            relations: ['participants'],
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: {
                startDate: Between(startDate, endDate),
            },
            relations: ['participants'],
        });
    }

    async findByNotifyBeforeStart(notifyBeforeStart: boolean): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { notifyBeforeStart },
            relations: ['participants'],
        });
    }

    async findUpcomingSchedules(): Promise<Schedule[]> {
        const now = new Date();
        return this.scheduleRepository.findAll({
            where: {
                startDate: MoreThanOrEqual(now),
            },
            relations: ['participants'],
            order: { startDate: 'ASC' },
        });
    }
}
