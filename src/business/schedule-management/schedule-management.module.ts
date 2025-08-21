import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controllers';
import { ScheduleManagementService } from './schedule-management.service';

@Module({
    imports: [],
    controllers: [ScheduleController],
    providers: [ScheduleManagementService],
    exports: [],
})
export class ScheduleManagementModule {}
