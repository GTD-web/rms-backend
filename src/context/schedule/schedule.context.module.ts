import { Module } from '@nestjs/common';
import { DomainScheduleModule } from '@src/domain/schedule/schedule.module';
import { DomainScheduleParticipantModule } from '@src/domain/schedule-participant/schedule-participant.module';
import { DomainScheduleRelationModule } from '@src/domain/schedule-relation/schedule-relation.module';
import { ScheduleContextService } from './schedule.context.service';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';

@Module({
    imports: [
        DomainScheduleModule,
        DomainScheduleParticipantModule,
        DomainScheduleRelationModule,
        DomainEmployeeModule,
        DomainReservationModule,
    ],
    providers: [ScheduleContextService],
    exports: [ScheduleContextService],
})
export class ScheduleContextModule {}
