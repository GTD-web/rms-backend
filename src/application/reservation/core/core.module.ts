import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Employee,
    Reservation,
    ReservationParticipant,
    ReservationSnapshot,
    ReservationVehicle,
    Resource,
    VehicleInfo,
    Notification,
    EmployeeNotification,
} from '@libs/entities';
import { UserReservationController } from '@src/application/reservation/core/controllers/reservation.controller';
import { AdminReservationController } from '@src/application/reservation/core/controllers/admin.reservation.controller';
import { CronReservationController } from '@src/application/reservation/core/controllers/cron.reservation.controller';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainReservationParticipantModule } from '@src/domain/reservation-participant/reservation-participant.module';
import { DomainReservationVehicleModule } from '@src/domain/reservation-vehicle/reservation-vehicle.module';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { NotificationModule } from '@src/application/notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';

// Usecases
import * as Usecases from './usecases';

// Services
import { AdminReservationService } from './services/admin-reservation.service';
import { ReservationService } from './services/reservation.service';
import { CronReservationService } from './services/cron-reservation.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainNotificationRepository } from '@src/domain/notification/notification.repository';
import { DomainNotificationModule } from '@src/domain/notification/notification.module';
import { DomainEmployeeNotificationModule } from '@src/domain/employee-notification/employee-notification.module';
import { DomainFileModule } from '@src/domain/file/file.module';
import { ReservationManagementContextModule } from '@src/context/reservation-management/reservation-management.context.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Reservation,
            ReservationParticipant,
            ReservationVehicle,
            Employee,
            Resource,
            VehicleInfo,
            Notification,
        ]),
        DomainReservationModule,
        DomainReservationParticipantModule,
        DomainReservationVehicleModule,
        DomainEmployeeModule,
        DomainResourceModule,
        DomainVehicleInfoModule,
        NotificationModule,
        DomainEmployeeNotificationModule,
        DomainNotificationModule,
        DomainFileModule,
        ScheduleModule.forRoot(),
        ReservationManagementContextModule,
    ],
    controllers: [AdminReservationController, UserReservationController, CronReservationController],
    providers: [
        // Services
        AdminReservationService,
        ReservationService,
        CronReservationService,

        // Usecases
        ...Object.values(Usecases),
    ],
    exports: [
        // Services
        AdminReservationService,
        ReservationService,
        CronReservationService,

        // Usecases
        ...Object.values(Usecases),
    ],
})
export class ReservationCoreModule {}
