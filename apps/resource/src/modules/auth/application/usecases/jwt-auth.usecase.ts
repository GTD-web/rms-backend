import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { LoginDto } from '../dto/login.dto';
import { User } from '@resource/modules/auth/domain/models/user';
import { DateUtil } from '@libs/utils/date.util';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtAuthUsecase implements AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return user;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user: User = await this.validateUser(loginDto.email, loginDto.password);

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
