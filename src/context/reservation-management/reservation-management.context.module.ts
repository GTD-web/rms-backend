import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationParticipant, Employee, Resource } from '@libs/entities';

// Domain Modules
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainReservationParticipantModule } from '@src/domain/reservation-participant/reservation-participant.module';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';

// Context Services
import { ReservationManagementService } from './services/reservation-management.service';
import { ReservationValidationService } from './services/reservation-validation.service';
import { ReservationConflictService } from './services/reservation-conflict.service';

/**
 * 예약 관리 컨텍스트 모듈
 *
 * 이 모듈은 예약 관리에 관련된 모든 비즈니스 로직을 포함합니다:
 * - 예약 생성, 수정, 취소
 * - 예약 충돌 검증 (동일 시간대 중복 불가)
 * - 예약 일정 조회 및 관리
 * - 예약자 관리 (Employee ID 참조)
 *
 * 특징:
 * - 자원의 세부 정보는 포함하지 않고 식별자만 활용
 * - 예약(Reservation) 도메인에 집중
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation, ReservationParticipant, Employee, Resource]),
        // Domain Layer Modules
        DomainReservationModule,
        DomainReservationParticipantModule,
        DomainEmployeeModule,
        DomainResourceModule,
    ],
    controllers: [],
    providers: [
        // Context Services
        ReservationManagementService,
        ReservationValidationService,
        ReservationConflictService,
    ],
    exports: [
        // Context Services
        ReservationManagementService,
        ReservationValidationService,
        ReservationConflictService,
    ],
})
export class ReservationManagementContextModule {}
