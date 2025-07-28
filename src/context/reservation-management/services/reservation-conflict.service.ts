import { DateUtil } from '@libs/utils/date.util';
import { Injectable } from '@nestjs/common';
import { LessThan, MoreThan } from 'typeorm';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Not } from 'typeorm';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

/**
 * 예약 충돌 검증 서비스
 *
 * 예약 시간대의 충돌을 검증하는 서비스입니다:
 * - 동일 자원의 시간대 중복 검사
 * - 예약 가능 여부 확인
 * - 충돌 상황 분석
 */
@Injectable()
export class ReservationConflictService {
    constructor(private readonly domainReservationService: DomainReservationService) {}

    /**
     * 예약 충돌 검사
     *
     * @param resourceId 자원 ID
     * @param startDate 시작 시간
     * @param endDate 종료 시간
     * @param excludeReservationId 제외할 예약 ID (수정 시 자기 자신 제외용)
     * @returns 충돌 여부
     */
    async isReservationTimeConflict(
        resourceId: string,
        startDate: Date,
        endDate: Date,
        excludeReservationId?: string,
    ): Promise<boolean> {
        try {
            // 해당 자원의 활성 예약들 조회
            const startDateObj = DateUtil.date(startDate).toDate();
            const endDateObj = DateUtil.date(endDate).toDate();

            const reservations = await this.domainReservationService.findAll({
                where: {
                    reservationId: excludeReservationId ? Not(excludeReservationId) : undefined,
                    status: ReservationStatus.CONFIRMED,
                    startDate: LessThan(endDateObj),
                    endDate: MoreThan(startDateObj),
                    resourceId: resourceId,
                },
            });

            return reservations.length > 0;
        } catch (error) {
            // 조회 실패 시 안전을 위해 충돌로 간주
            console.error('예약 충돌 검사 중 오류:', error);
            return true;
        }
    }
}
