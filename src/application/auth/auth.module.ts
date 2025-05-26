import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '@resource/application/auth/strategies/jwt.strategy';
import { Employee } from '@libs/entities';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '@src/domain/employee/employee.module';
import { AuthService } from './auth.service';
import { ValidateUsecase } from './usecases/validate.usecase';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateUsecase } from './usecases/update.usecase';

@Module({
    imports: [PassportModule, EmployeeModule, TypeOrmModule.forFeature([Employee])],
    providers: [JwtStrategy, AuthService, ValidateUsecase, SsoLoginUsecase, UpdateUsecase],
    controllers: [AuthController],
    exports: [JwtStrategy],
})
export class AuthModule {}
