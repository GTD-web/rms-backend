import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Employee, User } from '@libs/entities';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';
import axios from 'axios';
import { UserService } from '../services/user.service';
import { DateUtil } from '@libs/utils/date.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SsoResponseDto } from '../dto/sso-response.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class SsoAuthUsecase implements AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
        private readonly dataSource: DataSource,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        let user = await this.userService.findByEmail(email);
        if (!user) {
            const client_id = process.env.SSO_CLIENT_ID;
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(`${ssoApiUrl}/api/auth/login`, {
                client_id,
                email: email,
                password: password,
            });

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const data: SsoResponseDto = response.data.data;
                const newUser = new User();
                newUser.email = data.email;
                newUser.password = data.password;
                newUser.mobile = data.phoneNumber;
                user = await this.userService.save(newUser, { queryRunner });

                const [result]: Employee[] = await this.eventEmitter.emitAsync('find.employee', {
                    employeeNumber: data.employeeNumber,
                    queryRunner,
                });
                if (result) {
                    user.employee = result;
                    await this.userService.update(user, { queryRunner });
                } else {
                    throw new UnauthorizedException('SSO 로그인 실패');
                }
                await queryRunner.commitTransaction();
            } catch (error) {
                console.log(error);
                await queryRunner.rollbackTransaction();
                throw new UnauthorizedException('SSO 로그인 실패');
            } finally {
                await queryRunner.release();
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        return user;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user.employee.userId) {
            await this.eventEmitter.emitAsync('update.employee', {
                employee: {
                    employeeId: user.employee.employeeId,
                    user: user,
                },
            });
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
            await this.userService.update(user);

            result.accessToken = accessToken;
        }

        return result;
    }
}
