import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationSnapshot } from '@libs/entities';
import { SnapshotService } from './snapshot.service';
import { UserReservationSnapshotController } from './controllers/snapshot.controller';
import { DomainReservationSnapshotModule } from '@src/domain/reservation-snapshot/reservation-snapshot.module';
import {
    FindSnapshotUsecase,
    UpsertSnapshotUsecase,
    ConvertSnapshotUsecase,
    CreateSnapshotUsecase,
    DeleteSnapshotUsecase,
    UpdateSnapshotUsecase,
} from './usecases';
@Module({
    imports: [TypeOrmModule.forFeature([ReservationSnapshot]), DomainReservationSnapshotModule],
    controllers: [UserReservationSnapshotController],
    providers: [
        SnapshotService,
        FindSnapshotUsecase,
        UpsertSnapshotUsecase,
        ConvertSnapshotUsecase,
        CreateSnapshotUsecase,
        DeleteSnapshotUsecase,
        UpdateSnapshotUsecase,
    ],
    exports: [],
})
export class ReservationSnapshotModule {}
