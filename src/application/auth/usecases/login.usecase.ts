import { Injectable } from '@nestjs/common';
import { EmployeeService } from '@src/domain/employee/employee.service';
import { UserService } from '@src/domain/user/user.service';
import { User as UserEntity } from '@libs/entities/user.entity';
import { DateUtil } from '@libs/utils/date.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly employeeService: EmployeeService,
    ) {}

    async execute(user: UserEntity) {
        if (!user.employee.userId) {
            await this.employeeService.update(user.employee.employeeId, {
                userId: user.userId,
            });

            user = await this.userService.findByUserId(user.userId);
        }

        const result = {
            accessToken: null,
            email: user.email,
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
            roles: user.roles,
        };
        if (user.accessToken && user.expiredAt && DateUtil.now().format() < user.expiredAt) {
            result.accessToken = user.accessToken;
        } else {
            const payload = {
                userId: user.userId,
                employeeId: user.employeeId,
                roles: user.roles,
            };

            const accessToken = this.jwtService.sign(payload);
            const expiredAt = DateUtil.now().addDays(1).format();

            user.accessToken = accessToken;
            user.expiredAt = expiredAt;
            await this.userService.update(user.userId, user);

            result.accessToken = accessToken;
        }

        return result;
    }
}
