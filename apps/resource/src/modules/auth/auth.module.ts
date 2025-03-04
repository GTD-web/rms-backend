import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthUsecase } from './application/usecases/jwt-auth.usecase';
import { SsoAuthUsecase } from './application/usecases/sso-auth.usecase';
import { AuthController } from './infrastructure/adapters/in/web/auth.controller';
import { UserRepository } from './infrastructure/adapters/out/user.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { User, Employee } from '@libs/entities';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/adapters/in/web/user.controller';
import { UserUsecase } from './application/usecases/user.usecase';
@Module({
    imports: [PassportModule, TypeOrmModule.forFeature([User, Employee])],
    providers: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthUsecase : JwtAuthUsecase,
        },
        UserService,
        UserRepository,
        {
            provide: 'UserRepositoryPort',
            useClass: UserRepository,
        },
        UserUsecase,
    ],
    controllers: [AuthController, UserController],
    exports: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthUsecase : JwtAuthUsecase,
        },
        UserService,
        UserUsecase,
    ],
})
export class AuthModule {}
