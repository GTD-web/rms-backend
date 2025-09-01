import { Injectable, BadRequestException } from '@nestjs/common';
import { Schedule } from '@libs/entities/schedule.entity';
import { Reservation } from '@libs/entities/reservation.entity';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DateUtil } from '@libs/utils/date.util';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ScheduleStatus } from '@libs/enums/schedule-type.enum';

export interface PolicyResult {
    isAllowed: boolean;
    reason?: string;
    reasonCode?: string;
}

export interface ScheduleExtendRequest {
    newEndDate: Date;
}

export interface ScheduleUpdateRequest {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    notifyBeforeStart?: boolean;
    notifyMinutesBeforeStart?: number[];
}

export interface ScheduleCreateRequest {
    title: string;
    description?: string;
    location?: string;
    scheduleType: string;
    participants: { employeeId: string }[];
    datesSelection: { startDate: string; endDate: string }[];
    resourceSelection?: {
        resourceId: string;
        resourceType: string;
    };
    projectSelection?: {
        projectId: string;
    };
}

@Injectable()
export class SchedulePolicyService {
    constructor(private readonly domainReservationService: DomainReservationService) {}

    /**
     * 일정 취소 가능 여부를 판단합니다
     */
    async 일정_취소가_가능한지_확인한다(schedule: Schedule, reservation?: Reservation): Promise<PolicyResult> {
        const now = DateUtil.now().toDate();

        // 2. 일정 상태 체크 - 이미 진행 중이거나 완료된 일정은 취소 불가
        if (schedule.startDate <= now || schedule.status === ScheduleStatus.PROCESSING) {
            return {
                isAllowed: false,
                reason: '이미 시작된 일정은 취소할 수 없습니다.',
                reasonCode: 'SCHEDULE_ALREADY_STARTED',
            };
        }

        // 3. 예약 상태 체크 (예약이 있는 경우)
        if (reservation) {
            if (reservation.status === ReservationStatus.CANCELLED) {
                return {
                    isAllowed: false,
                    reason: '이미 취소된 예약입니다.',
                    reasonCode: 'RESERVATION_ALREADY_CANCELLED',
                };
            }

            if (reservation.status === ReservationStatus.CLOSED) {
                return {
                    isAllowed: false,
                    reason: '이미 완료된 예약은 취소할 수 없습니다.',
                    reasonCode: 'RESERVATION_ALREADY_COMPLETED',
                };
            }
        }

        return { isAllowed: true };
    }

    /**
     * 일정 완료 가능 여부를 판단합니다
     */
    async 일정_완료가_가능한지_확인한다(schedule: Schedule, reservation?: Reservation): Promise<PolicyResult> {
        const now = DateUtil.now().toDate();

        // 1. 시간 정책 체크 - 일정이 시작되어야 완료 가능
        if (schedule.startDate > now || schedule.status === ScheduleStatus.PENDING) {
            return {
                isAllowed: false,
                reason: '아직 시작되지 않은 일정은 완료할 수 없습니다.',
                reasonCode: 'SCHEDULE_NOT_STARTED',
            };
        }

        // 2. 예약 상태 체크 (예약이 있는 경우)
        if (reservation) {
            if (reservation.status === ReservationStatus.CANCELLED) {
                return {
                    isAllowed: false,
                    reason: '취소된 예약은 완료할 수 없습니다.',
                    reasonCode: 'RESERVATION_CANCELLED',
                };
            }

            if (reservation.status === ReservationStatus.CLOSED) {
                return {
                    isAllowed: false,
                    reason: '이미 완료된 예약입니다.',
                    reasonCode: 'RESERVATION_ALREADY_COMPLETED',
                };
            }

            // 확정된 예약만 완료 가능
            if (reservation.status !== ReservationStatus.CONFIRMED) {
                return {
                    isAllowed: false,
                    reason: '확정된 예약만 완료할 수 있습니다.',
                    reasonCode: 'INVALID_RESERVATION_STATUS',
                };
            }
        }

        return { isAllowed: true };
    }

    /**
     * 일정 연장 가능 여부를 판단합니다
     */
    async 일정_연장이_가능한지_확인한다(
        schedule: Schedule,
        extendRequest: ScheduleExtendRequest,
        reservation?: Reservation,
    ): Promise<PolicyResult> {
        const now = DateUtil.now().toDate();

        // 1. 시간 정책 체크 - 연장은 현재 시간 이후로만 가능
        if (extendRequest.newEndDate <= now) {
            return {
                isAllowed: false,
                reason: '연장 시간은 현재 시간 이후여야 합니다.',
                reasonCode: 'INVALID_EXTEND_TIME',
            };
        }

        // 2. 기존 종료 시간보다 늦어야 함
        if (extendRequest.newEndDate <= schedule.endDate) {
            return {
                isAllowed: false,
                reason: '연장 시간은 기존 종료 시간보다 늦어야 합니다.',
                reasonCode: 'EXTEND_TIME_TOO_EARLY',
            };
        }

        // 3. 최대 연장 시간 체크 (예: 4시간)
        const maxExtensionHours = 4;
        const maxExtendTime = new Date(schedule.endDate);
        maxExtendTime.setHours(maxExtendTime.getHours() + maxExtensionHours);

        if (extendRequest.newEndDate > maxExtendTime) {
            return {
                isAllowed: false,
                reason: `최대 ${maxExtensionHours}시간까지만 연장 가능합니다.`,
                reasonCode: 'EXCEED_MAX_EXTENSION',
            };
        }

        // 4. 예약이 있는 경우 자원 충돌 체크
        if (reservation) {
            const isAvailable = await this.domainReservationService.checkReservationConflicts(
                reservation.resourceId,
                schedule.endDate, // 기존 종료 시간부터
                extendRequest.newEndDate, // 새로운 종료 시간까지
            );

            if (!isAvailable) {
                return {
                    isAllowed: false,
                    reason: '연장하려는 시간대에 다른 예약이 있습니다.',
                    reasonCode: 'RESOURCE_CONFLICT',
                };
            }
        }

        return { isAllowed: true };
    }

    /**
     * 일정 수정 가능 여부를 판단합니다
     */
    async 일정_수정이_가능한지_확인한다(
        schedule: Schedule,
        updateRequest: ScheduleUpdateRequest,
        reservation?: Reservation,
    ): Promise<PolicyResult> {
        const now = DateUtil.now().toDate();

        // 1. 시간 정책 체크 - 시작 1시간 전까지만 수정 가능
        const modificationDeadline = new Date(schedule.startDate);
        modificationDeadline.setHours(modificationDeadline.getHours() - 1);

        if (now > modificationDeadline) {
            return {
                isAllowed: false,
                reason: '일정 시작 1시간 전까지만 수정이 가능합니다.',
                reasonCode: 'MODIFICATION_TIME_EXCEEDED',
            };
        }

        // 2. 날짜/시간 변경이 있는 경우 추가 체크
        if (updateRequest.startDate || updateRequest.endDate) {
            const newStartDate = updateRequest.startDate || schedule.startDate;
            const newEndDate = updateRequest.endDate || schedule.endDate;

            // 2-1. 시작 시간이 종료 시간보다 늦으면 안됨
            if (newStartDate >= newEndDate) {
                return {
                    isAllowed: false,
                    reason: '시작 시간은 종료 시간보다 빨라야 합니다.',
                    reasonCode: 'INVALID_TIME_RANGE',
                };
            }

            // 2-2. 과거 시간으로 변경 불가
            if (newStartDate < now) {
                return {
                    isAllowed: false,
                    reason: '과거 시간으로는 수정할 수 없습니다.',
                    reasonCode: 'PAST_TIME_NOT_ALLOWED',
                };
            }

            // 2-3. 예약이 있는 경우 자원 충돌 체크
            if (reservation && (updateRequest.startDate || updateRequest.endDate)) {
                // TODO: 본인 예약 제외 로직은 별도 구현 필요
                const isAvailable = await this.domainReservationService.checkReservationConflicts(
                    reservation.resourceId,
                    newStartDate,
                    newEndDate,
                );

                if (!isAvailable) {
                    return {
                        isAllowed: false,
                        reason: '수정하려는 시간대에 다른 예약이 있습니다.',
                        reasonCode: 'RESOURCE_CONFLICT',
                    };
                }
            }
        }

        return { isAllowed: true };
    }

    /**
     * 다중 일정 생성 가능 여부를 판단합니다 (레거시 로직 유지)
     * - 각 날짜별로 자원 가용성 체크 (레거시에서는 비즈니스 레이어에서 처리)
     * - 여기서는 기본적인 정책만 체크하고, 자원 충돌은 비즈니스 레이어에서 처리
     */
    async 다중_일정_생성이_가능한지_확인한다(createRequest: ScheduleCreateRequest): Promise<PolicyResult> {
        const now = DateUtil.now().toDate();

        // 1. 기본 유효성 체크
        if (!createRequest.datesSelection || createRequest.datesSelection.length === 0) {
            return {
                isAllowed: false,
                reason: '날짜 선택이 필요합니다.',
                reasonCode: 'NO_DATES_SELECTED',
            };
        }

        // 2. 각 날짜별 시간 정책 체크
        for (const dateRange of createRequest.datesSelection) {
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);

            // 과거 시간 체크 - 현재 시간이 속한 30분 단위 시간대부터 예약 가능
            const current30MinStart = new Date(now);
            const currentMinutes = current30MinStart.getMinutes();

            if (currentMinutes < 30) {
                // 0~29분: 해당 시간의 정각(00분)부터 가능
                current30MinStart.setMinutes(0, 0, 0);
            } else {
                // 30~59분: 해당 시간의 30분부터 가능
                current30MinStart.setMinutes(30, 0, 0);
            }

            if (startDate < current30MinStart) {
                return {
                    isAllowed: false,
                    reason: '현재 30분 단위 시간대 이전으로는 일정을 생성할 수 없습니다.',
                    reasonCode: 'PAST_30MIN_SLOT_NOT_ALLOWED',
                };
            }

            // 시작/종료 시간 유효성 체크
            if (startDate >= endDate) {
                return {
                    isAllowed: false,
                    reason: '시작 시간은 종료 시간보다 빨라야 합니다.',
                    reasonCode: 'INVALID_TIME_RANGE',
                };
            }
        }

        // 3. 자원 예약 정책 체크는 비즈니스 레이어에서 처리 (레거시 로직 유지)
        // 레거시에서는 각 날짜별로 자원 가용성을 체크하며, 실패한 일정은 failedSchedules에 포함

        return { isAllowed: true };
    }

    /**
     * 정책 체크 실패 시 예외를 던집니다
     */
    /**
     * 일정 30분 연장 가능 여부를 판단합니다
     * 1. 자원예약이 포함된 일정인지 확인
     * 2. 현재 시간이 일정 종료 15분 전부터 일정 종료시간 사이인지 확인
     * 3. 30분 연장 시 충돌하는 예약이 있는지 확인
     */
    async 일정_30분_연장이_가능한지_확인한다(schedule: Schedule, reservation?: Reservation): Promise<PolicyResult> {
        // 1. 자원예약이 포함된 일정인지 확인
        if (!reservation) {
            return {
                isAllowed: false,
                reason: '자원예약이 포함된 일정만 연장할 수 있습니다.',
                reasonCode: 'NO_RESOURCE_RESERVATION',
            };
        }

        // 2. 예약 상태 확인 (활성 상태인지)
        if (schedule.status !== ScheduleStatus.PROCESSING && reservation.status !== ReservationStatus.CONFIRMED) {
            return {
                isAllowed: false,
                reason: '활성 상태인 예약만 연장할 수 있습니다.',
                reasonCode: 'RESERVATION_INACTIVE',
            };
        }

        // 3. 현재 시간이 연장 가능 시간 범위에 있는지 확인 (일정 종료 15분 전부터 일정 종료시간 사이)
        // const currentTime = new Date();
        // const extendableStartTime = new Date(schedule.endDate);
        // extendableStartTime.setMinutes(extendableStartTime.getMinutes() - 15);

        // if (currentTime < extendableStartTime || currentTime > schedule.endDate) {
        //     return {
        //         isAllowed: false,
        //         reason: '일정 종료 15분 전부터 종료시간까지만 연장할 수 있습니다.',
        //         reasonCode: 'INVALID_EXTEND_TIME',
        //     };
        // }

        // 4. 30분 연장 시 충돌하는 예약이 있는지 확인
        const extendedEndTime = new Date(schedule.endDate);
        extendedEndTime.setMinutes(extendedEndTime.getMinutes() + 30);

        try {
            const isAvailable = await this.domainReservationService.checkReservationConflicts(
                reservation.resourceId,
                schedule.endDate,
                extendedEndTime,
                reservation.reservationId,
            );

            if (!isAvailable) {
                return {
                    isAllowed: false,
                    reason: '연장하려는 시간에 다른 예약이 있습니다.',
                    reasonCode: 'RESERVATION_CONFLICT',
                };
            }
        } catch (error) {
            return {
                isAllowed: false,
                reason: '예약 충돌 확인 중 오류가 발생했습니다.',
                reasonCode: 'CONFLICT_CHECK_ERROR',
            };
        }

        return {
            isAllowed: true,
            reason: '일정 연장이 가능합니다.',
        };
    }

    정책_체크_실패시_예외를_던진다(policyResult: PolicyResult): void {
        if (!policyResult.isAllowed) {
            throw new BadRequestException({
                message: policyResult.reason || '정책 위반',
                code: policyResult.reasonCode || 'POLICY_VIOLATION',
            });
        }
    }
}
