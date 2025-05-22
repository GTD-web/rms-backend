import { Injectable } from '@nestjs/common';
import { EmployeeService } from '@src/domain/employee/employee.service';
import { UserService } from '@src/domain/user/user.service';
import { User as UserEntity } from '@libs/entities/user.entity';

@Injectable()
export class LoginUsecase {
    constructor(
        private readonly userService: UserService,
        private readonly employeeService: EmployeeService,
    ) {}

    async execute(user: UserEntity) {
        return this.authService.login(user);
    }
}
