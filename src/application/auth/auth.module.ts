import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '@resource/application/auth/strategies/jwt.strategy';
import { Employee } from '@libs/entities';
import { AuthController } from './controllers/auth.controller';
import { EmployeeModule } from '@src/domain/employee/employee.module';
import { AuthService } from './auth.service';
import { ValidateUsecase } from './usecases/validate.usecase';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { CheckSystemAdminUsecase } from './usecases/system-admin.usecase';
import { GetTokenUsecase } from './usecases/get-token.usecase';

@Module({
    imports: [PassportModule, EmployeeModule, TypeOrmModule.forFeature([Employee])],
    providers: [
        JwtStrategy,
        AuthService,
        ValidateUsecase,
        SsoLoginUsecase,
        UpdateAuthInfoUsecase,
        CheckSystemAdminUsecase,
        GetTokenUsecase,
    ],
    controllers: [AuthController],
    exports: [JwtStrategy],
})
export class AuthModule {}
