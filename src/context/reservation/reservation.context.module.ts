import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationParticipant, Employee, Resource, ReservationVehicle } from '@libs/entities';

// Domain Modules
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainReservationParticipantModule } from '@src/domain/reservation-participant/reservation-participant.module';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainNotificationModule } from '@src/domain/notification/notification.module';
import { DomainEmployeeNotificationModule } from '@src/domain/employee-notification/employee-notification.module';
import { DomainReservationVehicleModule } from '@src/domain/reservation-vehicle/reservation-vehicle.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { DomainFileModule } from '@src/domain/file/file.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FileContextModule } from '../file/file.context.module';

// Context Services
import { ReservationContextService } from './services/reservation.context.service';

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
        TypeOrmModule.forFeature([Reservation, ReservationParticipant, Employee, Resource, ReservationVehicle]),
        // Domain Layer Modules
        DomainReservationModule,
        DomainReservationParticipantModule,
        DomainEmployeeModule,
        DomainResourceModule,
        DomainNotificationModule,
        DomainEmployeeNotificationModule,
        DomainReservationVehicleModule,
        DomainVehicleInfoModule,
        DomainFileModule,
        // Context Layer Modules
        FileContextModule,
        // NotificationModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [],
    providers: [
        // Context Services

        ReservationContextService,
    ],
    exports: [
        // Context Services
        ReservationContextService,
    ],
})
export class ReservationContextModule {}
