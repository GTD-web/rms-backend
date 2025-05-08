import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationParticipant, Schedule, ReservationSnapshot, ReservationVehicle } from '@libs/entities';
import { ReservationService } from './application/services/reservation.service';
import { ReservationRepository } from './infrastructure/adapters/out/persistence/reservation.repository';
import { ReservationParticipantRepository } from './infrastructure/adapters/out/persistence/reservation-participant.repository';
import { ParticipantService } from './application/services/participant.service';
import { ReservationUsecase } from './application/usecases/reservation.usecase';
import { ReservationEventHandler } from './application/handler/reservation-event.handler';
import { AdminReservationController } from './infrastructure/adapters/in/web/controllers/v1/admin.reservation.controller';
import { UserReservationController } from './infrastructure/adapters/in/web/controllers/v1/reservation.controller';
import { ReservationSnapshotUsecase } from './application/usecases/reservation-snapshot.usecase';
import { ReservationSnapshotRepository } from './infrastructure/adapters/out/persistence/reservation-snapshot.repository';
import { ReservationSnapshotService } from './application/services/reservation-snapshot.service';
import { ReservationVehicleService } from './application/services/reservation-vehicle.service';
import { ReservationVehicleRepository } from './infrastructure/adapters/out/persistence/reservation-vehicle.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Reservation,
            ReservationParticipant,
            Schedule,
            ReservationSnapshot,
            ReservationVehicle,
        ]),
    ],
    providers: [
        ReservationService,
        ParticipantService,
        ReservationSnapshotService,
        ReservationVehicleService,
        {
            provide: 'ReservationRepositoryPort',
            useClass: ReservationRepository,
        },
        {
            provide: 'ReservationParticipantRepositoryPort',
            useClass: ReservationParticipantRepository,
        },
        {
            provide: 'ReservationSnapshotRepositoryPort',
            useClass: ReservationSnapshotRepository,
        },
        {
            provide: 'ReservationVehicleRepositoryPort',
            useClass: ReservationVehicleRepository,
        },

        ReservationUsecase,
        ReservationEventHandler,
        ReservationSnapshotUsecase,
    ],
    controllers: [AdminReservationController, UserReservationController],
    exports: [ReservationService, ReservationSnapshotUsecase, ReservationVehicleService],
})
export class ReservationModule {}
