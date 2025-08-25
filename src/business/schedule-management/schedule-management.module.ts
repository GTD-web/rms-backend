import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controllers';
import { ScheduleManagementService } from './schedule-management.service';
import { ScheduleContextModule } from '../../context/schedule/schedule.context.module';
import { ResourceContextModule } from '../../context/resource/resource.context.module';
import { FileContextModule } from '../../context/file/file.context.module';

@Module({
    imports: [ScheduleContextModule, ResourceContextModule, FileContextModule],
    controllers: [ScheduleController],
    providers: [ScheduleManagementService],
    exports: [],
})
export class ScheduleManagementModule {}
