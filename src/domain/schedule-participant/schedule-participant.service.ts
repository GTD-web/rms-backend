import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleParticipantRepository } from './schedule-participant.repository';
import { BaseService } from '@libs/services/base.service';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { In } from 'typeorm';

@Injectable()
export class DomainScheduleParticipantService extends BaseService<ScheduleParticipant> {
    constructor(private readonly scheduleParticipantRepository: DomainScheduleParticipantRepository) {
        super(scheduleParticipantRepository);
    }

    async findReserversByScheduleIds(scheduleIds: string[]): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { scheduleId: In(scheduleIds), type: ParticipantsType.RESERVER },
        });
    }

    async findByEmployeeIdAndScheduleIds(employeeId: string, scheduleIds: string[]): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { employeeId, scheduleId: In(scheduleIds) },
        });
    }

    async findAllByScheduleIds(scheduleIds: string[]): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { scheduleId: In(scheduleIds) },
        });
    }
}
