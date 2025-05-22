import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '@resource/application/auth/strategies/jwt.strategy';
import { User, Employee } from '@libs/entities';
import { AuthController } from './auth.controller';
import { UserModule } from '@src/domain/user/user.module';
import { EmployeeModule } from '@src/domain/employee/employee.module';
import { AuthService } from './auth.service';
import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginUsecase } from './usecases/login.usecase';

@Module({
    imports: [PassportModule, UserModule, EmployeeModule, TypeOrmModule.forFeature([User, Employee])],
    providers: [JwtStrategy, AuthService, ValidateUsecase, LoginUsecase],
    controllers: [AuthController],
    exports: [JwtStrategy],
})
export class AuthModule {}
