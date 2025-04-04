import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@libs/entities';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';
import axios from 'axios';
import { UserService } from '../services/user.service';
import { DateUtil } from '@libs/utils/date.util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SsoAuthUsecase implements AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        let user = await this.userService.findByEmail(email);
        if (!user) {
            const client_id = process.env.SSO_CLIENT_ID;
            const ssoApiUrl = process.env.SSO_API_URL;
            try {
                const response = await axios.post(`${ssoApiUrl}/api/auth/login`, {
                    client_id,
                    email: email,
                    password: password,
                });

                const newUser = new User();
                newUser.email = response.data.data.email;
                newUser.password = response.data.data.password;
                newUser.employeeId = response.data.data.employeeId;
                newUser.roles = response.data.data.roles;
                newUser.userId = response.data.data.userId;
                newUser.employee = response.data.data.employee;
                user = await this.userService.save(newUser);
            } catch (error) {
                throw new UnauthorizedException('SSO 로그인 실패');
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

        // SSO 서버에서 토큰을 받아옴
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

        return {
            accessToken,
            email: user.email,
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
            roles: user.roles,
        };
    }
}
