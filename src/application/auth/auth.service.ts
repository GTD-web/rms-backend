import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '@libs/entities/user.entity';
import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginDto } from '@src/modules/auth/application/dto/login.dto';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateUsecase } from './usecases/update.usecase';

@Injectable()
export class AuthService {
    constructor(
        private readonly validateUsecase: ValidateUsecase,
        private readonly ssoLoginUsecase: SsoLoginUsecase,
        private readonly updateUsecase: UpdateUsecase,
    ) {}

    async login(loginDto: LoginDto) {
        let employee = await this.validateUsecase.execute(loginDto.email, loginDto.password);
        if (!employee) {
            const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
            employee = await this.updateUsecase.execute(ssoResponse);
        }

        return {
            accessToken: employee.accessToken,
            email: employee.email,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            roles: employee.roles,
        };
    }
}
