import { Injectable, Logger } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';
import { ScheduleQueryContextService } from './schedule-query.context.service';
import { ReservationContextService } from '../../reservation/services/reservation.context.service';
import { ScheduleNotificationContextService } from '../../notification/services/schedule-notification.context.service';
import { EmployeeContextService } from '../../employee/employee.context.service';
import { Schedule } from '@libs/entities/schedule.entity';

@Injectable()
export class SchedulePostProcessingService {
    private readonly logger = new Logger(SchedulePostProcessingService.name);

    constructor() // private readonly employeeContextService: EmployeeContextService, // private readonly scheduleQueryContextService: ScheduleQueryContextService,
    // private readonly scheduleNotificationContextService: ScheduleNotificationContextService,
    {}

    // /**
    //  * 일정 생성 후처리 (알림/감사/도메인이벤트)
    //  * - 레거시 로직 유지: 695-709 라인의 알림 전송 로직을 후처리로 이동
    //  */
    // async 일정_생성_후처리(
    //     user: Employee,
    //     createdSchedule: Schedule,
    //     participants: { employeeId: string }[],
    // ): Promise<void> {
    //     try {
    //         if (!createdSchedule) {
    //             this.logger.warn('생성된 일정이 없어 알림을 전송하지 않습니다.');
    //             return;
    //         }

    //         const { schedule, reservation, resource } =
    //             await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(createdSchedule.scheduleId!, {
    //                 withReservation: true,
    //                 withResource: true,
    //             });

    //         const systemAdmins = await this.employeeContextService.시스템관리자_목록을_조회한다();
    //         await this.scheduleNotificationContextService.일정_생성_알림을_전송한다(
    //             { schedule, reservation, resource },
    //             [user.employeeId, ...participants.map((participant) => participant.employeeId)],
    //             systemAdmins.map((admin) => admin.employeeId),
    //         );

    //         // 감사 로그 기록
    //         this.logger.log(
    //             `일정 생성 완료 - 생성자: ${user.employeeId}, 첫 번째 일정ID: ${createdSchedule.scheduleId}`,
    //         );
    //     } catch (error) {
    //         this.logger.error(`일정 생성 후처리 실패: ${error.message}`, error.stack);
    //         // 후처리 실패는 메인 로직에 영향 주지 않음
    //     }
    // }

    // async 일정_취소_후처리(user: Employee, cancelResult: any): Promise<void> {
    //     try {
    //         const participants = await this.scheduleQueryContextService.일정들의_모든참가자정보를_조회한다([
    //             cancelResult.schedule.scheduleId,
    //         ]);
    //         const participantIds = Array.from(participants.get(cancelResult.schedule.scheduleId) || []).map(
    //             (p) => p.employee.employeeId,
    //         );

    //         if (participantIds.length > 0) {
    //             this.logger.log(`일정 취소 알림 발송 대상: ${participantIds.join(', ')}`);
    //         }

    //         this.logger.log(
    //             `일정 취소 완료 - 일정ID: ${cancelResult.schedule.scheduleId}, 취소자: ${user.employeeId}, 취소시간: ${cancelResult.cancelledAt}`,
    //         );
    //     } catch (error) {
    //         this.logger.error(`일정 취소 후처리 실패: ${error.message}`, error.stack);
    //     }
    // }

    // async 일정_완료_후처리(user: Employee, completeResult: any): Promise<void> {
    //     try {
    //         const participants = await this.scheduleQueryContextService.일정들의_모든참가자정보를_조회한다([
    //             completeResult.schedule.scheduleId,
    //         ]);
    //         const participantIds = Array.from(participants.get(completeResult.schedule.scheduleId) || []).map(
    //             (p) => p.employee.employeeId,
    //         );

    //         if (participantIds.length > 0) {
    //             this.logger.log(`일정 완료 알림 발송 대상: ${participantIds.join(', ')}`);
    //         }

    //         this.logger.log(
    //             `일정 완료 - 일정ID: ${completeResult.schedule.scheduleId}, 완료자: ${user.employeeId}, 완료시간: ${completeResult.completedAt}`,
    //         );
    //     } catch (error) {
    //         this.logger.error(`일정 완료 후처리 실패: ${error.message}`, error.stack);
    //     }
    // }

    // async 일정_연장_후처리(user: Employee, extendResult: any): Promise<void> {
    //     try {
    //         const participants = await this.scheduleQueryContextService.일정들의_모든참가자정보를_조회한다([
    //             extendResult.schedule.scheduleId,
    //         ]);
    //         const participantIds = Array.from(participants.get(extendResult.schedule.scheduleId) || []).map(
    //             (p) => p.employee.employeeId,
    //         );

    //         if (participantIds.length > 0) {
    //             this.logger.log(`일정 연장 알림 발송 대상: ${participantIds.join(', ')}`);
    //         }

    //         this.logger.log(
    //             `일정 연장 - 일정ID: ${extendResult.schedule.scheduleId}, 연장자: ${user.employeeId}, 기존종료: ${extendResult.originalEndDate}, 신규종료: ${extendResult.newEndDate}`,
    //         );
    //     } catch (error) {
    //         this.logger.error(`일정 연장 후처리 실패: ${error.message}`, error.stack);
    //     }
    // }

    // async 일정_수정_후처리(user: Employee, updateResult: any): Promise<void> {
    //     try {
    //         if (Object.keys(updateResult.changes).length > 0) {
    //             const participants = await this.scheduleQueryContextService.일정들의_모든참가자정보를_조회한다([
    //                 updateResult.schedule.scheduleId,
    //             ]);
    //             const participantIds = Array.from(participants.get(updateResult.schedule.scheduleId) || []).map(
    //                 (p) => p.employee.employeeId,
    //             );

    //             if (participantIds.length > 0) {
    //                 this.logger.log(`일정 수정 알림 발송 대상: ${participantIds.join(', ')}`);
    //             }

    //             this.logger.log(
    //                 `일정 수정 - 일정ID: ${updateResult.schedule.scheduleId}, 수정자: ${user.employeeId}, 변경사항: ${JSON.stringify(updateResult.changes)}`,
    //             );
    //         }
    //     } catch (error) {
    //         this.logger.error(`일정 수정 후처리 실패: ${error.message}`, error.stack);
    //     }
    // }
}
