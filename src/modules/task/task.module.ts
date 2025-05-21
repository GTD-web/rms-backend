import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { ResourceModule } from '../resource/resource.module';
import { ReservationModule } from '../reservation/reservation.module';
import { TaskService } from './task.service';
import { GetTaskListUsecase } from './application/usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from './application/usecases/getTaskStatus.usecase';

@Module({
    imports: [ResourceModule, ReservationModule],
    controllers: [TaskController],
    providers: [TaskService, GetTaskListUsecase, GetTaskStatusUsecase],
    exports: [TaskService],
})
export class TaskModule {}
