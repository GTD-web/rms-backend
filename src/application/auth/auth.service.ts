import { Injectable } from '@nestjs/common';
import { GetTaskListUsecase } from './application/usecases/getTaskList.usecase';
import { GetTaskStatusUsecase } from './application/usecases/getTaskStatus.usecase';
import { User as UserEntity } from '@libs/entities/user.entity';
@Injectable()
export class AuthService {
    constructor(
        private readonly getTaskListUsecase: GetTaskListUsecase,
        private readonly getTaskStatusUsecase: GetTaskStatusUsecase,
    ) {}

    async validateUser(user: UserEntity) {
        return this.getTaskListUsecase.execute(user);
    }

    async login(user: UserEntity) {
        return this.getTaskStatusUsecase.execute(user);
    }
}
