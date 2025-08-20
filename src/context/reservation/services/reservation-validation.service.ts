import { Injectable, ForbiddenException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { UpsertReservationDto } from '../dtos/upsert-reservation.dto';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DateUtil } from '@libs/utils/date.util';
import { Employee, Reservation, ReservationParticipant } from '@libs/entities';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';

/**
 * 예약 검증 서비스
 *
 * 예약 관련 데이터 검증과 권한 검증을 담당하는 서비스입니다:
 * - 예약 데이터 유효성 검증
 * - 수정/취소 권한 검증
 * - 비즈니스 규칙 검증
 */
@Injectable()
export class ReservationValidationService {
    constructor(
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly domainReservationService: DomainReservationService,
        private readonly domainReservationParticipantService: DomainReservationParticipantService,
        private readonly domainResourceService: DomainResourceService,
    ) {}

    /**
     * 예약 데이터 검증
     */
    async validateReservationData(upsertReservationDto: UpsertReservationDto): Promise<void> {
        const { reservationId, resourceId, startDate, endDate } = upsertReservationDto;

        if (reservationId) {
            await this.validateReservationId(reservationId);
        }

        if (resourceId) {
            await this.validateResourceId(resourceId);
        }

        if (startDate && endDate) {
            this.validateTimeRange(startDate, endDate);
        }

        if (startDate) {
            this.validateReservationTiming(startDate);
        }
    }

    /**
     * 예약 접근 권한 검증
     */
    async validateAccessPermission(reservationId: string, employeeId: string): Promise<boolean> {
        const reservation = await this.domainReservationService.findOne({
            where: { reservationId, participants: { employeeId, type: ParticipantsType.RESERVER } },
            relations: ['participants'],
        });
        if (!reservation) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.COMMON.UNAUTHORIZED);
        }
        return true;
    }

    /**
     * 자원 ID 검증
     */
    async validateResourceId(resourceId: string): Promise<void> {
        const resource = await this.domainResourceService.findOne({ where: { resourceId } });
        if (!resource) {
            throw new BadRequestException('자원이 존재하지 않습니다.');
        }
    }

    /**
     * 예약 ID 검증
     */
    async validateReservationId(reservationId: string): Promise<Reservation> {
        const reservation = await this.domainReservationService.findOne({ where: { reservationId } });
        if (!reservation) {
            throw new BadRequestException('예약이 존재하지 않습니다.');
        }
        return reservation;
    }

    async validateReserverId(employeeId: string, reservationId: string): Promise<ReservationParticipant> {
        const reserver = await this.domainReservationParticipantService.findOne({
            where: { employeeId, type: ParticipantsType.RESERVER, reservationId },
        });
        console.log('reserver', reserver);
        if (!reserver) {
            throw new BadRequestException('예약자가 존재하지 않습니다.');
        }
        return reserver;
    }

    /**
     * 시간 범위 유효성 검증
     */
    validateTimeRange(startDate: Date, endDate: Date): void {
        if (startDate >= endDate) {
            throw new BadRequestException('종료 시간은 시작 시간보다 늦어야 합니다.');
        }

        // 최소 예약 시간 (15분)
        // const minDuration = 15 * 60 * 1000;
        // const duration = endDate.getTime() - startDate.getTime();

        // if (duration < minDuration) {
        //     throw new BadRequestException('최소 15분 이상 예약해야 합니다.');
        // }
    }

    /**
     * 예약 시점 검증
     */
    validateReservationTiming(criterionStartDate?: Date, criterionEndDate?: Date): boolean {
        const now = DateUtil.date(new Date()).toDate();
        return (
            (criterionStartDate ? now >= criterionStartDate : true) &&
            (criterionEndDate ? now <= criterionEndDate : true)
        );
    }

    /**
     * 수정 가능 검증
     */
    // async validateUpdatePermission(reservation: any, requesterId: number): Promise<void> {
    //     // 1. 예약자 본인 또는 관리자만 수정 가능
    //     if (reservation.requesterId !== requesterId) {
    //         const requester = await this.domainEmployeeService.findById(requesterId);
    //         if (!requester || !this.isAdmin(requester)) {
    //             throw new ForbiddenException('예약을 수정할 권한이 없습니다.');
    //         }
    //     }

    //     // 2. 예약 상태 확인 (확정된 예약만 수정 가능)
    //     if (!['PENDING', 'CONFIRMED'].includes(reservation.status)) {
    //         throw new BadRequestException('현재 상태에서는 예약을 수정할 수 없습니다.');
    //     }

    //     // 3. 수정 가능 시점 검증 (예약 시작 2시간 전까지만 수정 가능)
    //     const now = new Date();
    //     const reservationStart = new Date(reservation.startDate);
    //     const timeDiff = reservationStart.getTime() - now.getTime();
    //     const twoHours = 2 * 60 * 60 * 1000;

    //     if (timeDiff < twoHours) {
    //         throw new BadRequestException('예약 시작 2시간 전까지만 수정할 수 있습니다.');
    //     }
    // }

    /**
     * 취소 가능 검증
     */
    // async validateCancellationTiming(reservation: any): Promise<void> {
    //     const now = new Date();
    //     const reservationStart = new Date(reservation.startDate);
    //     const timeDiff = reservationStart.getTime() - now.getTime();
    //     const oneHour = 60 * 60 * 1000;

    //     // 예약 시작 1시간 전까지만 취소 가능
    //     if (timeDiff < oneHour) {
    //         throw new BadRequestException('예약 시작 1시간 전까지만 취소할 수 있습니다.');
    //     }
    // }
}
