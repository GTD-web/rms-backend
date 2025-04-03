import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@resource/modules/auth/domain/models/user';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';
import axios from 'axios';
import { UserService } from '../services/user.service';
import { DateUtil } from '@libs/utils/date.util';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SsoAuthUsecase implements AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            const client_id = process.env.SSO_CLIENT_ID;
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(`${ssoApiUrl}/api/auth/login`, {
                client_id,
                email: email,
                password: password,
            });
            console.log(response.data.data);
            await this.userService.save(response.data.data);
            return response.data.data;
        }

        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
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

        user.updateAccessToken(accessToken, expiredAt);
        await this.userService.update(user);

        return {
            accessToken,
            email: user.email,
            name: user.name,
            department: user.department,
            position: user.position,
            roles: user.roles,
        };
    }
}
