import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { UpsertReservationDto } from '../dtos/upsert-reservation.dto';
import { UpdateReservationTimeDto } from '@src/application/reservation/core/dtos/update-reservation.dto';
import { ReservationConflictService } from './reservation-conflict.service';
import { ReservationValidationService } from './reservation-validation.service';
import { DateUtil } from '@libs/utils/date.util';
import { Reservation } from '@libs/entities';

/**
 * 예약 관리 서비스
 *
 * 예약의 생성, 수정, 취소를 담당하는 핵심 서비스입니다:
 * - 예약 CRUD 작업
 * - 비즈니스 규칙 적용
 * - 충돌 검증 연동
 * - 알림 처리 연동
 *
 * 특징:
 * - 자원 정보는 ID만 참조하여 loose coupling 유지
 * - 예약 도메인에 집중
 */
@Injectable()
export class ReservationManagementService {
    constructor(
        private readonly domainReservationService: DomainReservationService,
        private readonly reservationConflictService: ReservationConflictService,
        private readonly reservationValidationService: ReservationValidationService,
    ) {}

    /**
     * 예약 생성
     */
    // async createReservation(requesterId: number, createDto: CreateReservationDto): Promise<ReservationResponseDto> {
    //     // 1. 요청자 유효성 검증
    //     await this.validateRequester(requesterId);

    //     // 2. 예약 데이터 검증
    //     await this.reservationValidationService.validateReservationData(createDto);

    //     // 3. 충돌 검증
    //     const hasConflict = await this.reservationConflictService.checkConflict(
    //         createDto.resourceId,
    //         createDto.startDate,
    //         createDto.endDate,
    //     );

    //     if (hasConflict) {
    //         throw new BadRequestException('해당 시간대에 이미 다른 예약이 있습니다.');
    //     }

    //     // 4. 예약 생성
    //     const reservationData = {
    //         requesterId,
    //         resourceId: createDto.resourceId,
    //         startDate: createDto.startDate,
    //         endDate: createDto.endDate,
    //         purpose: createDto.purpose,
    //         additionalInfo: createDto.additionalInfo,
    //         status: 'PENDING' as const,
    //     };

    //     const reservation = await this.domainReservationService.create(reservationData);

    //     // 5. 참가자 추가 (있는 경우)
    //     if (createDto.participantIds && createDto.participantIds.length > 0) {
    //         await this.addParticipants(reservation.id, createDto.participantIds);
    //     }

    //     // 6. 알림 발송
    //     await this.reservationNotificationService.sendCreatedNotification(reservation.id);

    //     return new ReservationResponseDto(reservation);
    // }

    /**
     * 예약 시간 수정
     */
    async updateReservationTime(reservationId: string, updateDto: UpdateReservationTimeDto): Promise<Reservation> {
        //1. 예약 존재 여부 확인
        const reservation = await this.reservationValidationService.validateReservationId(reservationId);

        // 2. 시간 충돌 검증
        const startDate = DateUtil.date(updateDto.startDate).toDate();
        const endDate = DateUtil.date(updateDto.endDate).toDate();
        const hasConflict = await this.reservationConflictService.isReservationTimeConflict(
            reservation.resourceId,
            startDate,
            endDate,
            reservationId, // 자기 자신 제외
        );
        if (hasConflict) {
            throw new BadRequestException('변경하려는 시간대에 이미 다른 예약이 있습니다.');
        }
        // 3. 예약 수정
        const updatedReservation = await this.domainReservationService.update(reservationId, {
            startDate,
            endDate,
        });
        return updatedReservation;
    }

    /**
     * 예약 수정
     */
    // async updateReservation(
    //     reservationId: number,
    //     requesterId: number,
    //     updateDto: UpdateReservationDto,
    // ): Promise<ReservationResponseDto> {
    //     // 1. 예약 존재 여부 확인
    //     const existingReservation = await this.getReservationById(reservationId);

    //     // 2. 수정 권한 검증
    //     await this.reservationValidationService.validateUpdatePermission(existingReservation, requesterId);

    //     // 3. 시간 변경 시 충돌 검증
    //     if (updateDto.startDate || updateDto.endDate) {
    //         const startDate = updateDto.startDate || existingReservation.startDate;
    //         const endDate = updateDto.endDate || existingReservation.endDate;

    //         const hasConflict = await this.reservationConflictService.checkConflict(
    //             existingReservation.resourceId,
    //             startDate,
    //             endDate,
    //             reservationId, // 자기 자신 제외
    //         );

    //         if (hasConflict) {
    //             throw new BadRequestException('변경하려는 시간대에 이미 다른 예약이 있습니다.');
    //         }
    //     }

    //     // 4. 예약 수정
    //     const updatedReservation = await this.domainReservationService.update(reservationId.toString(), {
    //         ...updateDto,
    //         updatedAt: new Date(),
    //     });

    //     return new ReservationResponseDto(updatedReservation);
    // }

    /**
     * 예약 취소
     */
    // async cancelReservation(reservationId: number, requesterId: number): Promise<void> {
    //     // 1. 예약 존재 여부 확인
    //     const reservation = await this.getReservationById(reservationId);

    //     // 2. 취소 권한 검증
    //     await this.reservationValidationService.validateCancelPermission(reservation, requesterId);

    //     // 3. 취소 가능 시점 검증
    //     await this.reservationValidationService.validateCancellationTiming(reservation);

    //     // 4. 예약 상태 변경
    //     await this.domainReservationService.update(reservationId.toString(), {
    //         status: 'CANCELLED',
    //         updatedAt: new Date(),
    //     });

    //     // 5. 알림 발송
    //     await this.reservationNotificationService.sendCancelledNotification(reservationId);
    // }

    /**
     * 예약 조회 (상세)
     */
    // async getReservationDetail(reservationId: number): Promise<ReservationResponseDto> {
    //     const reservation = await this.getReservationById(reservationId);
    //     return new ReservationResponseDto(reservation);
    // }

    /**
     * 사용자별 예약 목록 조회
     */
    // async getUserReservations(employeeId: number, status?: string[]): Promise<ReservationResponseDto[]> {
    //     const whereCondition: any = { requesterId: employeeId };

    //     if (status && status.length > 0) {
    //         whereCondition.status = status;
    //     }

    //     const reservations = await this.domainReservationService.findAll({
    //         where: whereCondition,
    //         orderBy: { createdAt: 'DESC' },
    //     });

    //     return reservations.map((reservation) => new ReservationResponseDto(reservation));
    // }

    /**
     * 자원별 예약 목록 조회
     */
    // async getResourceReservations(
    //     resourceId: number,
    //     startDate?: Date,
    //     endDate?: Date,
    // ): Promise<ReservationResponseDto[]> {
    //     const whereCondition: any = { resourceId };

    //     // 날짜 범위 조건 추가
    //     if (startDate && endDate) {
    //         // TODO: 날짜 범위 조건을 올바르게 구현
    //         // 현재는 임시로 기본 조건만 사용
    //     }

    //     const reservations = await this.domainReservationService.findAll({
    //         where: whereCondition,
    //         orderBy: { startDate: 'ASC' },
    //     });

    //     return reservations.map((reservation) => new ReservationResponseDto(reservation));
    // }

    /**
     * 예약 승인 (관리자용)
     */
    // async approveReservation(reservationId: number, approverId: number): Promise<ReservationResponseDto> {
    //     const reservation = await this.getReservationById(reservationId);

    //     if (reservation.status !== 'PENDING') {
    //         throw new BadRequestException('대기 중인 예약만 승인할 수 있습니다.');
    //     }

    //     const updatedReservation = await this.domainReservationService.update(reservationId.toString(), {
    //         status: 'CONFIRMED',
    //         approverId,
    //         approvedAt: new Date(),
    //         updatedAt: new Date(),
    //     });

    //     return new ReservationResponseDto(updatedReservation);
    // }

    /**
     * 예약 거부 (관리자용)
     */
    // async rejectReservation(
    //     reservationId: number,
    //     rejecterId: number,
    //     reason: string,
    // ): Promise<ReservationResponseDto> {
    //     const reservation = await this.getReservationById(reservationId);

    //     if (reservation.status !== 'PENDING') {
    //         throw new BadRequestException('대기 중인 예약만 거부할 수 있습니다.');
    //     }

    //     const updatedReservation = await this.domainReservationService.update(reservationId.toString(), {
    //         status: 'REJECTED',
    //         rejectionReason: reason,
    //         updatedAt: new Date(),
    //     });

    //     return new ReservationResponseDto(updatedReservation);
    // }

    /**
     * 요청자 유효성 검증
     */
    // private async validateRequester(requesterId: number): Promise<void> {
    //     const requester = await this.domainEmployeeService.findById(requesterId);
    //     if (!requester) {
    //         throw new NotFoundException('요청자를 찾을 수 없습니다.');
    //     }
    // }

    /**
     * 예약 조회 (내부용)
     */
    // private async getReservationById(reservationId: number): Promise<any> {
    //     const reservation = await this.domainReservationService.findById(reservationId.toString());
    //     if (!reservation) {
    //         throw new NotFoundException('예약을 찾을 수 없습니다.');
    //     }
    //     return reservation;
    // }

    /**
     * 참가자 추가
     */
    // private async addParticipants(reservationId: number, participantIds: number[]): Promise<void> {
    //     // TODO: ReservationParticipant 도메인 서비스 활용하여 참가자 추가
    //     // 현재는 구현하지 않음 (도메인 서비스 인터페이스 확인 필요)
    // }
}
