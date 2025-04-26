import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationParticipant, Schedule, ReservationSnapshot } from '@libs/entities';
import { ReservationService } from './application/services/reservation.service';
import { ReservationController } from './infrastructure/adapters/in/web/controllers/reservation.controller';
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
@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ReservationParticipant, Schedule, ReservationSnapshot])],
    providers: [
        ReservationService,
        ParticipantService,
        ReservationSnapshotService,
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

        ReservationUsecase,
        ReservationEventHandler,
        ReservationSnapshotUsecase,
    ],
    controllers: [ReservationController, AdminReservationController, UserReservationController],
    exports: [ReservationService, ReservationSnapshotUsecase],
})
export class ReservationModule {}
