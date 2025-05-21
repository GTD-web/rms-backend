import { User } from '@libs/entities';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';

export interface AuthService {
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
}
