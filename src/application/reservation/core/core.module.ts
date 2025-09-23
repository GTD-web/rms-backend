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
import { DomainFileReservationVehicleModule } from '@src/domain/file-reservation-vehicle/file-reservation-vehicle.module';
import { DomainFileVehicleInfoModule } from '@src/domain/file-vehicle-info/file-vehicle-info.module';
import { ReservationContextModule } from '@src/context/reservation/reservation.context.module';

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
        DomainFileReservationVehicleModule,
        DomainFileVehicleInfoModule,
        ScheduleModule.forRoot(),
        // ReservationContextModule,
    ],
    controllers: [AdminReservationController, UserReservationController],
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
