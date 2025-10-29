import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controllers';
import { ScheduleManagementService } from './schedule-management.service';
import { ScheduleContextModule } from '../../context/schedule/schedule.context.module';
import { ResourceContextModule } from '../../context/resource/resource.context.module';
import { ReservationContextModule } from '../../context/reservation/reservation.context.module';
import { NotificationContextModule } from '../../context/notification/notification.context.module';
import { FileContextModule } from '../../context/file/file.context.module';
import { ProjectContextModule } from '../../context/project/project.context.module';
import { EmployeeContextModule } from '@src/context/employee/employee.context.module';
import { createSimpleScheduleTestData } from './test-data/schedule-test-data';

@Module({
    imports: [
        ScheduleContextModule,
        ResourceContextModule,
        ReservationContextModule,
        NotificationContextModule,
        FileContextModule,
        ProjectContextModule,
        EmployeeContextModule,
    ],
    controllers: [ScheduleController],
    providers: [ScheduleManagementService],
    exports: [],
})
export class ScheduleManagementModule {}
