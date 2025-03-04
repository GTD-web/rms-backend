import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthService } from './application/services/jwt-auth.service';
import { SsoAuthService } from './application/services/sso-auth.service';
import { AuthController } from './infrastructure/adapters/in/web/auth.controller';
import { UserRepository } from './infrastructure/adapters/out/user.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { User, Employee } from '@libs/entities';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/adapters/in/web/user.controller';

@Module({
    imports: [PassportModule, TypeOrmModule.forFeature([User, Employee])],
    providers: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthService : JwtAuthService,
        },
        UserService,
        UserRepository,
        {
            provide: 'UserRepositoryPort',
            useClass: UserRepository,
        },
    ],
    controllers: [AuthController, UserController],
    exports: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthService : JwtAuthService,
        },
        UserService,
    ],
})
export class AuthModule {}
