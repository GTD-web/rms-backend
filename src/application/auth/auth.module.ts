import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthUsecase } from './application/usecases/jwt-auth.usecase';
import { SsoAuthUsecase } from './application/usecases/sso-auth.usecase';
import { JwtStrategy } from '@resource/application/auth/strategies/jwt.strategy';
import { User, Employee } from '@libs/entities';
import { AuthController } from './auth.controller';
import { UserModule } from '@src/domain/user/user.module';
import { EmployeeModule } from '@src/domain/employee/employee.module';

@Module({
    imports: [PassportModule, UserModule, EmployeeModule, TypeOrmModule.forFeature([User, Employee])],
    providers: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthUsecase : JwtAuthUsecase,
        },
    ],
    controllers: [AuthController],
    exports: [
        JwtStrategy,
        {
            provide: 'AuthService',
            useClass: process.env.USE_SSO === 'true' ? SsoAuthUsecase : JwtAuthUsecase,
        },
    ],
})
export class AuthModule {}
