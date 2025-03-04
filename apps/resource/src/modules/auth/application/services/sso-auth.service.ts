import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Injectable } from '@nestjs/common';
import { User } from '@resource/modules/auth/domain/models/user';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';

@Injectable()
export class SsoAuthService implements AuthService {
    async validateUser(email: string, password: string): Promise<User> {
        // SSO API를 통해 사용자 인증
        return null;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        // SSO 서버에서 토큰을 받아옴
        return null;
    }
}
