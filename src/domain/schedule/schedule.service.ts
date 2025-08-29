import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainScheduleRepository } from './schedule.repository';
import { BaseService } from '@libs/services/base.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { MoreThanOrEqual, LessThanOrEqual, Between, In, Raw } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class DomainScheduleService extends BaseService<Schedule> {
    constructor(private readonly scheduleRepository: DomainScheduleRepository) {
        super(scheduleRepository);
    }

    async findByScheduleId(scheduleId: string): Promise<Schedule> {
        return this.scheduleRepository.findOne({
            where: { scheduleId },
        });
    }

    async findByScheduleIds(scheduleIds: string[]): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: {
                startDate: LessThanOrEqual(endDate),
                endDate: MoreThanOrEqual(startDate),
            },
        });
    }

    async findByEmployeeId(employeeId: string): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: { participants: { employeeId } },
        });
    }

    async findByEmployeeIdFromNow(employeeId: string): Promise<Schedule[]> {
        const now = new Date();

        now.setHours(now.getHours() + 9);
        const stringDate = now.toISOString().split('T')[0];
        const date = new Date(stringDate);

        return this.scheduleRepository.findAll({
            where: { participants: { employeeId }, endDate: MoreThanOrEqual(date) },
        });
    }

    /**
     * 월별 일정을 조회한다 (YYYY-MM 형식의 날짜 문자열)
     */
    async findByMonth(date: string): Promise<Schedule[]> {
        try {
            const startDateOfMonth = new Date(`${date}-01`);
            const endDateOfMonth = new Date(`${date}-01`);
            endDateOfMonth.setMonth(endDateOfMonth.getMonth() + 1);
            endDateOfMonth.setDate(0);
            endDateOfMonth.setHours(23, 59, 59);

            return this.findByDateRange(startDateOfMonth, endDateOfMonth);
        } catch (error) {
            throw new BadRequestException(`잘못된 날짜 형식입니다: ${date}. YYYY-MM 형식으로 입력해주세요.`);
        }
    }
}
