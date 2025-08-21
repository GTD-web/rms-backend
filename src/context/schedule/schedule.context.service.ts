import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainScheduleService } from '@src/domain/schedule/schedule.service';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';
import { DomainScheduleRelationService } from '@src/domain/schedule-relation/schedule-relation.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';

@Injectable()
export class ScheduleContextService {
    private readonly logger = new Logger(ScheduleContextService.name);

    constructor(
        private readonly domainScheduleService: DomainScheduleService,
        private readonly domainScheduleParticipantService: DomainScheduleParticipantService,
        private readonly domainScheduleRelationService: DomainScheduleRelationService,
    ) {}

    /**
     * 일정을 생성한다
     */
    async 일정을_생성한다(scheduleData: Partial<Schedule>): Promise<Schedule> {
        try {
            this.logger.log(`일정 생성 요청: ${scheduleData.title}`);

            const newSchedule = await this.domainScheduleService.create(scheduleData);

            this.logger.log(`일정 생성 완료: ${newSchedule.scheduleId}`);
            return newSchedule;
        } catch (error) {
            this.logger.error(`일정 생성 실패: ${error.message}`, error.stack);
            throw new BadRequestException('일정 생성 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정 목록을 조회한다
     */
    async 일정_목록을_조회한다(startDate?: Date, endDate?: Date): Promise<Schedule[]> {
        try {
            this.logger.log('일정 목록 조회 요청');

            if (startDate && endDate) {
                return await this.domainScheduleService.findByDateRange(startDate, endDate);
            }

            return await this.domainScheduleService.findAll();
        } catch (error) {
            this.logger.error(`일정 목록 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('일정 목록 조회 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정 상세정보를 조회한다
     */
    async 일정_상세정보를_조회한다(scheduleId: string): Promise<Schedule> {
        try {
            this.logger.log(`일정 상세정보 조회 요청: ${scheduleId}`);

            const schedule = await this.domainScheduleService.findByScheduleId(scheduleId);
            if (!schedule) {
                throw new NotFoundException('일정을 찾을 수 없습니다.');
            }

            return schedule;
        } catch (error) {
            this.logger.error(`일정 상세정보 조회 실패: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('일정 상세정보 조회 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정을 수정한다
     */
    async 일정을_수정한다(scheduleId: string, updateData: Partial<Schedule>): Promise<Schedule> {
        try {
            this.logger.log(`일정 수정 요청: ${scheduleId}`);

            const existingSchedule = await this.domainScheduleService.findByScheduleId(scheduleId);
            if (!existingSchedule) {
                throw new NotFoundException('일정을 찾을 수 없습니다.');
            }

            const updatedSchedule = await this.domainScheduleService.update(scheduleId, updateData);

            this.logger.log(`일정 수정 완료: ${scheduleId}`);
            return updatedSchedule;
        } catch (error) {
            this.logger.error(`일정 수정 실패: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('일정 수정 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정을 삭제한다
     */
    async 일정을_삭제한다(scheduleId: string): Promise<void> {
        try {
            this.logger.log(`일정 삭제 요청: ${scheduleId}`);

            const existingSchedule = await this.domainScheduleService.findByScheduleId(scheduleId);
            if (!existingSchedule) {
                throw new NotFoundException('일정을 찾을 수 없습니다.');
            }

            await this.domainScheduleService.delete(scheduleId);

            this.logger.log(`일정 삭제 완료: ${scheduleId}`);
        } catch (error) {
            this.logger.error(`일정 삭제 실패: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('일정 삭제 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정 참가자를 추가한다
     */
    async 일정_참가자를_추가한다(
        scheduleId: string,
        employeeId: string,
        type: ParticipantsType,
    ): Promise<ScheduleParticipant> {
        try {
            this.logger.log(`일정 참가자 추가 요청: ${scheduleId} - ${employeeId}`);

            const participantData = {
                scheduleId,
                employeeId,
                type,
            };

            const newParticipant = await this.domainScheduleParticipantService.create(participantData);

            this.logger.log(`일정 참가자 추가 완료: ${newParticipant.participantId}`);
            return newParticipant;
        } catch (error) {
            this.logger.error(`일정 참가자 추가 실패: ${error.message}`, error.stack);
            throw new BadRequestException('일정 참가자 추가 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정 참가자 목록을 조회한다
     */
    async 일정_참가자_목록을_조회한다(scheduleId: string): Promise<ScheduleParticipant[]> {
        try {
            this.logger.log(`일정 참가자 목록 조회 요청: ${scheduleId}`);

            return await this.domainScheduleParticipantService.findByScheduleId(scheduleId);
        } catch (error) {
            this.logger.error(`일정 참가자 목록 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('일정 참가자 목록 조회 중 오류가 발생했습니다.');
        }
    }

    /**
     * 직원의 일정 목록을 조회한다
     */
    async 직원의_일정_목록을_조회한다(employeeId: string): Promise<ScheduleParticipant[]> {
        try {
            this.logger.log(`직원의 일정 목록 조회 요청: ${employeeId}`);

            return await this.domainScheduleParticipantService.findByEmployeeId(employeeId);
        } catch (error) {
            this.logger.error(`직원의 일정 목록 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('직원의 일정 목록 조회 중 오류가 발생했습니다.');
        }
    }

    /**
     * 일정 관계를 생성한다
     */
    async 일정_관계를_생성한다(relationData: Partial<ScheduleRelation>): Promise<ScheduleRelation> {
        try {
            this.logger.log(`일정 관계 생성 요청: ${relationData.scheduleId}`);

            const newRelation = await this.domainScheduleRelationService.create(relationData);

            this.logger.log(`일정 관계 생성 완료: ${newRelation.scheduleRelationId}`);
            return newRelation;
        } catch (error) {
            this.logger.error(`일정 관계 생성 실패: ${error.message}`, error.stack);
            throw new BadRequestException('일정 관계 생성 중 오류가 발생했습니다.');
        }
    }

    /**
     * 예약과 연결된 일정을 조회한다
     */
    async 예약과_연결된_일정을_조회한다(reservationId: string): Promise<ScheduleRelation[]> {
        try {
            this.logger.log(`예약과 연결된 일정 조회 요청: ${reservationId}`);

            return await this.domainScheduleRelationService.findByReservationId(reservationId);
        } catch (error) {
            this.logger.error(`예약과 연결된 일정 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('예약과 연결된 일정 조회 중 오류가 발생했습니다.');
        }
    }

    /**
     * 다가오는 일정들을 조회한다
     */
    async 다가오는_일정들을_조회한다(): Promise<Schedule[]> {
        try {
            this.logger.log('다가오는 일정들 조회 요청');

            return await this.domainScheduleService.findUpcomingSchedules();
        } catch (error) {
            this.logger.error(`다가오는 일정들 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('다가오는 일정들 조회 중 오류가 발생했습니다.');
        }
    }
}
