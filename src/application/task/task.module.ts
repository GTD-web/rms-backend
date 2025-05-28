import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { GetTaskListUsecase } from './usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from './usecases/getTaskStatus.usecase';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';

@Module({
    imports: [DomainResourceModule, DomainReservationModule],
    controllers: [TaskController],
    providers: [TaskService, GetTaskListUsecase, GetTaskStatusUsecase],
    exports: [TaskService],
})
export class TaskModule {}
