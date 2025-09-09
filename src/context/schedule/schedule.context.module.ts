import { Module } from '@nestjs/common';
import { DomainScheduleModule } from '@src/domain/schedule/schedule.module';
import { DomainScheduleParticipantModule } from '@src/domain/schedule-participant/schedule-participant.module';
import { DomainScheduleRelationModule } from '@src/domain/schedule-relation/schedule-relation.module';
import { ScheduleQueryContextService } from './services/schedule-query.context.service';
import { ScheduleMutationContextService } from './services/schedule-mutation.context.service';
import { ScheduleAuthorizationService } from './services/schedule-authorization.service';
import { SchedulePolicyService } from './services/schedule-policy.service';
import { ScheduleStateTransitionService } from './services/schedule-state-transition.service';
import { SchedulePostProcessingService } from './services/schedule-post-processing.service';

import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainResourceGroupModule } from '@src/domain/resource-group/resource-group.module';
import { ReservationContextModule } from '../reservation/reservation.context.module';
import { DomainProjectModule } from '@src/domain/project/project.module';

@Module({
    imports: [
        DomainScheduleModule,
        DomainScheduleParticipantModule,
        DomainScheduleRelationModule,
        DomainEmployeeModule,
        DomainReservationModule,
        DomainResourceModule,
        DomainResourceGroupModule,
        DomainProjectModule,
        ReservationContextModule,
    ],
    providers: [
        ScheduleQueryContextService,
        ScheduleMutationContextService,
        ScheduleAuthorizationService,
        SchedulePolicyService,
        ScheduleStateTransitionService,
        SchedulePostProcessingService,
    ],
    exports: [
        ScheduleQueryContextService,
        ScheduleMutationContextService,
        ScheduleAuthorizationService,
        SchedulePolicyService,
        ScheduleStateTransitionService,
        SchedulePostProcessingService,
    ],
})
export class ScheduleContextModule {}
