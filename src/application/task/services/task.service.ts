import { Injectable } from '@nestjs/common';
import { GetTaskListUsecase } from '../usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from '../usecases/getTaskStatus.usecase';
import { Employee } from '@libs/entities';
@Injectable()
export class TaskService {
    constructor(
        private readonly getTaskListUsecase: GetTaskListUsecase,
        private readonly getTaskStatusUsecase: GetTaskStatusUsecase,
    ) {}

    async getTasks(user: Employee) {
        return this.getTaskListUsecase.execute(user);
    }

    async getTaskStatus(user: Employee) {
        return this.getTaskStatusUsecase.execute(user);
    }
}
