import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskManagementService } from './task-management.service';
import { ResourceContextModule } from '@src/context/resource/resource.context.module';
import { ReservationContextModule } from '@src/context/reservation/reservation.context.module';
import { NotificationContextModule } from '@src/context/notification/notification.context.module';

@Module({
    imports: [ResourceContextModule, ReservationContextModule, NotificationContextModule],
    controllers: [TaskController],
    providers: [TaskManagementService],
    exports: [TaskManagementService],
})
export class TaskManagementModule {}
