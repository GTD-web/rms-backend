import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationParticipant, Schedule } from '@libs/entities';
import { ReservationService } from './application/services/reservation.service';
import { ReservationController } from './infrastructure/adapters/in/web/controllers/reservation.controller';
import { ReservationRepository } from './infrastructure/adapters/out/persistence/reservation.repository';
import { ReservationParticipantRepository } from './infrastructure/adapters/out/persistence/reservation-participant.repository';
import { ParticipantService } from './application/services/participant.service';
import { ReservationUsecase } from './application/usecases/reservation.usecase';
@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ReservationParticipant, Schedule])],
    providers: [
        ReservationService,
        ParticipantService,
        {
            provide: 'ReservationRepositoryPort',
            useClass: ReservationRepository,
        },
        {
            provide: 'ReservationParticipantRepositoryPort',
            useClass: ReservationParticipantRepository,
        },
        ReservationUsecase,
    ],
    controllers: [ReservationController],
    exports: [ReservationService],
})
export class ReservationModule {}
