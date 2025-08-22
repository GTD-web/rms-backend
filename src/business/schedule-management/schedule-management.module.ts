import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controllers';
import { ScheduleManagementService } from './schedule-management.service';
import { ScheduleContextModule } from '../../context/schedule/schedule.context.module';

@Module({
    imports: [ScheduleContextModule],
    controllers: [ScheduleController],
    providers: [ScheduleManagementService],
    exports: [],
})
export class ScheduleManagementModule {}
