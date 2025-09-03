import { Injectable } from '@nestjs/common';
import { GetTaskListUsecase } from '../usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from '../usecases/getTaskStatus.usecase';
import { Employee } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/pagination-query.dto';
import { GetDelayedReturnVehicleUsecase } from '../usecases/getDelayedReturnVehicles.usecase';
import { GetNeedRaplaceConsumablesUsecase } from '../usecases/getNeedRaplaceConsumables.usecase';

@Injectable()
export class AdminTaskService {
    constructor(
        private readonly getDelayedReturnVehicleUsecase: GetDelayedReturnVehicleUsecase,
        private readonly getNeedRaplaceConsumablesUsecase: GetNeedRaplaceConsumablesUsecase,
    ) {}

    async getTasks(type: string) {
        if (type === '차량반납지연') {
            return this.getDelayedReturnVehicleUsecase.execute();
        } else if (type === '소모품교체') {
            return this.getNeedRaplaceConsumablesUsecase.execute();
        } else {
            return [];
        }
    }
}
