import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@resource/modules/auth/domain/models/user';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';
import axios from 'axios';
import { UserService } from '../services/user.service';

@Injectable()
export class SsoAuthUsecase implements AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string): Promise<User> {
        // const user = await this.userService.findByEmail(email);
        // if (!user) {
        //     const client_id = process.env.SSO_CLIENT_ID;
        //     const ssoApiUrl = process.env.SSO_API_URL;
        //     const response = await axios.post(`${ssoApiUrl}/api/auth/login`, {
        //         client_id,
        //         email: email,
        //         password: password,
        //     });
        //     console.log(response.data.data);
        //     await this.userService.save(response.data.data);
        //     return response.data.data;
        // }

        // const isPasswordValid = await user.checkPassword(password);
        // if (!isPasswordValid) {
        //     throw new UnauthorizedException('Invalid password');
        // }

        // return user;
        return null;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        // SSO 서버에서 토큰을 받아옴

        return null;
    }
}
