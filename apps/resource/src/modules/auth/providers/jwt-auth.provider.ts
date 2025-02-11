import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthProvider } from '../interfaces/auth-provider.interface';
import { UserService } from '../services/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthProvider implements IAuthProvider {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any): Promise<string> {
        const payload = {
            sub: user.id,
            email: user.email,
            permissions: user.permissions,
        };
        return this.jwtService.sign(payload);
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}
