import { Injectable } from '@nestjs/common';
import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginDto } from '@resource/application/auth/dto/login.dto';
import { SsoLoginUsecase } from './usecases/sso-login.usecase';
import { UpdateAuthInfoUsecase } from './usecases/update-auth-info.usecase';
import { CheckSystemAdminUsecase } from './usecases/system-admin.usecase';
import { GetTokenUsecase } from './usecases/get-token.usecase';

@Injectable()
export class AuthService {
    constructor(
        private readonly validateUsecase: ValidateUsecase,
        private readonly ssoLoginUsecase: SsoLoginUsecase,
        private readonly updateAuthInfoUsecase: UpdateAuthInfoUsecase,
        private readonly checkSystemAdminUsecase: CheckSystemAdminUsecase,
        private readonly getTokenUsecase: GetTokenUsecase,
    ) {}

    async login(loginDto: LoginDto) {
        // 시스템 관리자 로그인 시도
        // const systemAdminResult = await this.checkSystemAdminUsecase.execute(loginDto.email, loginDto.password);

        // if (systemAdminResult.success) {
        //     // 시스템 관리자인 경우 토큰 발급
        //     return await this.getTokenUsecase.execute(systemAdminResult.employee);
        // }

        const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
        console.log('ssoResponse', ssoResponse);
        const updatedEmployee = await this.updateAuthInfoUsecase.execute(ssoResponse);

        return {
            accessToken: updatedEmployee.accessToken,
            email: updatedEmployee.email,
            name: updatedEmployee.name,
            department: updatedEmployee.department,
            position: updatedEmployee.position,
            roles: updatedEmployee.roles,
        };
    }
}
