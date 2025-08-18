import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainScheduleParticipantRepository } from './schedule-participant.repository';
import { BaseService } from '@libs/services/base.service';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';

@Injectable()
export class DomainScheduleParticipantService extends BaseService<ScheduleParticipant> {
    constructor(private readonly scheduleParticipantRepository: DomainScheduleParticipantRepository) {
        super(scheduleParticipantRepository);
    }

    async findByParticipantId(participantId: string): Promise<ScheduleParticipant> {
        const scheduleParticipant = await this.scheduleParticipantRepository.findOne({
            where: { participantId },
        });
        return scheduleParticipant;
    }

    async findByScheduleId(scheduleId: string): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { scheduleId },
            relations: ['schedule'],
        });
    }

    async findByEmployeeId(employeeId: string): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { employeeId },
            relations: ['schedule'],
        });
    }

    async findByType(type: ParticipantsType): Promise<ScheduleParticipant[]> {
        return this.scheduleParticipantRepository.findAll({
            where: { type },
            relations: ['schedule'],
        });
    }
}
