import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { PaginationData } from '@libs/dtos/pagination-response.dto';
import { ReturnVehicleDto, UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { NotificationContextService } from '@src/context/notification/services/notification.context.service';
import { ReservationContextService } from '@src/context/reservation/services/reservation.context.service';
import { ReservationNotificationContextService } from '@src/context/notification/services/reservation-notification.context.service';
import { ScheduleQueryContextService } from '@src/context/schedule/services/schedule-query.context.service';
import { In } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationContextService: ReservationContextService,
        private readonly notificationContextService: NotificationContextService,
        private readonly scheduleQueryContextService: ScheduleQueryContextService,
        private readonly reservationNotificationContextService: ReservationNotificationContextService,
    ) {}

    async findReservationList(
        startDate?: string,
        endDate?: string,
        resourceType?: ResourceType,
        resourceId?: string,
        status?: string[],
    ): Promise<ReservationWithRelationsResponseDto[]> {
        // 1. 기본 예약 목록 조회 (schedule participants 제외)
        const basicReservations = await this.reservationContextService.예약목록을_조회한다(startDate, endDate, resourceType, resourceId, status);
        
        if (basicReservations.length === 0) {
            return basicReservations;
        }

        // 2. 모든 예약의 reservationId 수집
        const reservationIds = basicReservations.map(item => item.reservationId);
        
        // 3. 각 예약별로 schedule ID 조회
        const scheduleIdMap = new Map<string, string>();
        const scheduleIdPromises = reservationIds.map(async (reservationId) => {
            const scheduleIds = await this.scheduleQueryContextService.예약의_일정ID들을_조회한다(reservationId);
            if (scheduleIds.length > 0) {
                scheduleIdMap.set(reservationId, scheduleIds[0]); // 첫 번째 schedule ID 사용
            }
        });
        
        await Promise.all(scheduleIdPromises);
        
        if (scheduleIdMap.size === 0) {
            return basicReservations;
        }

        // 4. schedule ID가 있는 예약들만 처리
        const scheduleIds = Array.from(scheduleIdMap.values());
        
        // 5. schedule과 participants 정보를 벌크로 조회
        const scheduleDataList = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withParticipants: true,
        });

        // 6. schedule ID별로 participants 매핑
        const participantsByScheduleId = new Map<string, any[]>();
        scheduleDataList.forEach(scheduleData => {
            if (scheduleData.participants) {
                participantsByScheduleId.set(scheduleData.schedule.scheduleId, scheduleData.participants);
            }
        });

        // 7. reservation별로 participants 매핑하여 최종 결과 생성
        const enhancedItems = basicReservations.map(reservation => {
            const scheduleId = scheduleIdMap.get(reservation.reservationId);
            if (scheduleId && participantsByScheduleId.has(scheduleId)) {
                const scheduleParticipants = participantsByScheduleId.get(scheduleId) || [];
                
                // schedule participants를 reservation participants 형태로 변환
                const allParticipants = scheduleParticipants.map(participant => ({
                    participantId: participant.participantId,
                    reservationId: reservation.reservationId,
                    employeeId: participant.employeeId,
                    type: participant.type,
                    employee: participant.employee ? {
                        employeeId: participant.employee.employeeId,
                        name: participant.employee.name,
                        employeeNumber: participant.employee.employeeNumber,
                        department: participant.employee.department,
                        position: participant.employee.position,
                    } : undefined,
                    reservation: reservation,
                }));

                // reservers와 participants로 분리
                const reservers = allParticipants.filter(p => p.type === ParticipantsType.RESERVER);
                const participants = allParticipants.filter(p => p.type === ParticipantsType.PARTICIPANT);

                // reservation 객체에 participants 추가
                const reservationWithParticipants = {
                    ...reservation,
                    reservers,
                    participants,
                };

                return reservationWithParticipants;
            } else {
                // schedule relation이 없는 경우 기존 방식으로 처리
                return reservation;
            }
        });

        return enhancedItems;
    }

    async findCheckReservationList(
        query: PaginationQueryDto,
    ): Promise<PaginationData<ReservationWithRelationsResponseDto>> {
        // 1. 기본 예약 목록 조회 (schedule participants 제외)
        const basicReservations = await this.reservationContextService.확인필요_예약목록을_조회한다(query);
        
        if (basicReservations.items.length === 0) {
            return basicReservations;
        }

        // 2. 모든 예약의 reservationId 수집
        const reservationIds = basicReservations.items.map(item => item.reservationId);
        
        // 3. 각 예약별로 schedule ID 조회
        const scheduleIdMap = new Map<string, string>();
        const scheduleIdPromises = reservationIds.map(async (reservationId) => {
            const scheduleIds = await this.scheduleQueryContextService.예약의_일정ID들을_조회한다(reservationId);
            if (scheduleIds.length > 0) {
                scheduleIdMap.set(reservationId, scheduleIds[0]); // 첫 번째 schedule ID 사용
            }
        });
        
        await Promise.all(scheduleIdPromises);
        
        if (scheduleIdMap.size === 0) {
            return basicReservations;
        }

        // 5. schedule ID가 있는 예약들만 처리
        const scheduleIds = Array.from(scheduleIdMap.values());
        
        // 6. schedule과 participants 정보를 벌크로 조회
        const scheduleDataList = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withParticipants: true,
        });

        // 7. schedule ID별로 participants 매핑
        const participantsByScheduleId = new Map<string, any[]>();
        scheduleDataList.forEach(scheduleData => {
            if (scheduleData.participants) {
                participantsByScheduleId.set(scheduleData.schedule.scheduleId, scheduleData.participants);
            }
        });

        // 8. reservation별로 participants 매핑하여 최종 결과 생성
        const enhancedItems = basicReservations.items.map(reservation => {
            const scheduleId = scheduleIdMap.get(reservation.reservationId);
            if (scheduleId && participantsByScheduleId.has(scheduleId)) {
                const scheduleParticipants = participantsByScheduleId.get(scheduleId) || [];
                
                // schedule participants를 reservation participants 형태로 변환
                const allParticipants = scheduleParticipants.map(participant => ({
                    participantId: participant.participantId,
                    reservationId: reservation.reservationId,
                    employeeId: participant.employeeId,
                    type: participant.type,
                    employee: participant.employee ? {
                        employeeId: participant.employee.employeeId,
                        name: participant.employee.name,
                        employeeNumber: participant.employee.employeeNumber,
                        department: participant.employee.department,
                        position: participant.employee.position,
                    } : undefined,
                    reservation: reservation,
                }));

                // reservers와 participants로 분리
                const reservers = allParticipants.filter(p => p.type === ParticipantsType.RESERVER);
                const participants = allParticipants.filter(p => p.type === ParticipantsType.PARTICIPANT);

                // reservation 객체에 participants 추가
                const reservationWithParticipants = {
                    ...reservation,
                    reservers,
                    participants,
                };

                return reservationWithParticipants;
            } else {
                // schedule relation이 없는 경우 기존 방식으로 처리
                return reservation;
            }
        });

        return {
            items: enhancedItems,
            meta: basicReservations.meta,
        };
    }

    async findOne(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto> {
        const reservation = await this.reservationContextService.예약_상세를_조회한다(user, reservationId);
        const notifications = await this.notificationContextService.차량반납_알림을_조회한다(reservationId);
        return { ...reservation, notifications };
    }

    async updateStatus(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        const updatedReservation = await this.reservationContextService.예약상태를_변경한다(reservationId, updateDto);

        // const notiTarget = [
        //     ...updatedReservation.resource.resourceManagers.map((manager) => manager.employeeId),
        //     ...updatedReservation.participants.map((reserver) => reserver.employeeId),
        // ];

        // if (updatedReservation.resource.notifyReservationChange && updateDto.status !== ReservationStatus.CLOSED) {
        //     try {
        //         let notificationType: NotificationType;
        //         switch (updateDto.status) {
        //             case ReservationStatus.CONFIRMED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_CONFIRMED;
        //                 break;
        //             case ReservationStatus.CANCELLED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_CANCELLED;
        //                 break;
        //             case ReservationStatus.REJECTED:
        //                 notificationType = NotificationType.RESERVATION_STATUS_REJECTED;
        //                 break;
        //         }

        //         await this.notificationService.createNotification(
        //             notificationType,
        //             {
        //                 reservationId: updatedReservation.reservationId,
        //                 reservationTitle: updatedReservation.title,
        //                 reservationDate: DateUtil.toAlarmRangeString(
        //                     DateUtil.format(updatedReservation.startDate),
        //                     DateUtil.format(updatedReservation.endDate),
        //                 ),
        //                 resourceId: updatedReservation.resource.resourceId,
        //                 resourceName: updatedReservation.resource.name,
        //                 resourceType: updatedReservation.resource.type,
        //             },
        //             notiTarget,
        //         );
        //     } catch (error) {
        //         console.log(error);
        //         console.log('Notification creation failed in updateStatus');
        //     }
        // }

        return updatedReservation;
    }

    async returnVehicle(user: Employee, reservationId: string, returnDto: ReturnVehicleDto): Promise<boolean> {
        const result = await this.reservationContextService.차량을_반납한다(user, reservationId, returnDto);

        // 예약의 스케쥴 정보를 조회한다.
        const scheduleIds = await this.scheduleQueryContextService.예약의_일정ID들을_조회한다(reservationId);
        // 일정과_관계정보들을_조회한다
        const { resource } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(scheduleIds[0], {
            withReservation: true,
            withResource: true,
        });

        await this.reservationNotificationContextService.차량반납_알림을_전송한다({ resource }, [user.employeeId]);
        return result;
    }
}
