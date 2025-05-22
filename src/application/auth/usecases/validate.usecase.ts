import { User } from '@libs/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/domain/user/user.service';
import { EmployeeService } from '@src/domain/employee/employee.service';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { SsoResponseDto } from '@src/modules/auth/application/dto/sso-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUsecase {
    constructor(
        private readonly userService: UserService,
        private readonly employeeService: EmployeeService,
        private readonly dataSource: DataSource,
    ) {}

    async execute(email: string, password: string): Promise<User> {
        let user = await this.userService.findByEmail(email);
        if (!user) {
            const client_id = process.env.SSO_CLIENT_ID;
            const client_secret = process.env.SSO_CLIENT_SECRET;
            const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(
                `${ssoApiUrl}/api/auth/login`,
                {
                    grant_type: 'password',
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                    },
                },
            );

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const data: SsoResponseDto = response.data;
                const newUser = new User();
                newUser.email = data.email;
                newUser.password = bcrypt.hashSync(password, 10);
                newUser.mobile = data.phoneNumber;
                user = await this.userService.save(newUser, { queryRunner });

                const result = await this.employeeService.findOne({
                    where: {
                        employeeNumber: data.employeeNumber,
                    },
                    queryRunner,
                });
                if (result) {
                    user.employee = result;
                    await this.userService.update(user.userId, user, { queryRunner });
                } else {
                    throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
                }
                await queryRunner.commitTransaction();
            } catch (error) {
                console.log(error);
                await queryRunner.rollbackTransaction();
                throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
            } finally {
                await queryRunner.release();
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.INVALID_PASSWORD);
        }

        return user;
    }
}
