import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { LoginDto } from '../dto/login.dto';
import { User } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class JwtAuthUsecase implements AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 사용자입니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
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
