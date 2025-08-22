import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleRepository } from './schedule.repository';
import { BaseService } from '@libs/services/base.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { MoreThanOrEqual, LessThanOrEqual, Between, In } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';

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

    async findByEmployeeIdFromNow(employeeId: string): Promise<Schedule[]> {
        const now = new Date();
        // TODO : 개발 후 제거
        now.setDate(now.getDate() - 30);
        now.setHours(now.getHours() + 9);
        const stringDate = now.toISOString().split('T')[0];
        const date = new Date(stringDate);

        return this.scheduleRepository.findAll({
            where: { participants: { employeeId }, endDate: MoreThanOrEqual(date) },
        });
    }

    async findByScheduleIds(scheduleIds: string[]): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }
}
