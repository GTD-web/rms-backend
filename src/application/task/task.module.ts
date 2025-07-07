import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { GetTaskListUsecase } from './usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from './usecases/getTaskStatus.usecase';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { GetDelayedReturnVehicleUsecase } from './usecases/getDelayedReturnVehicles.usecase';
import { GetNeedRaplaceConsumablesUsecase } from './usecases/getNeedRaplaceConsumables.usecase';
import { AdminTaskController } from './controllers/admin.task.controller';
import { AdminTaskService } from './services/admin.task.service';

@Module({
    imports: [DomainResourceModule, DomainReservationModule],
    controllers: [TaskController, AdminTaskController],
    providers: [
        TaskService,
        AdminTaskService,
        GetTaskListUsecase,
        GetTaskStatusUsecase,
        GetDelayedReturnVehicleUsecase,
        GetNeedRaplaceConsumablesUsecase,
    ],
    exports: [TaskService],
})
export class TaskModule {}
