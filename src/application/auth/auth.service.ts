import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User as UserEntity } from '@libs/entities/user.entity';
import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginDto } from '@src/modules/auth/application/dto/login.dto';
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
        const systemAdminResult = await this.checkSystemAdminUsecase.execute(loginDto.email, loginDto.password);

        if (systemAdminResult.success) {
            // 시스템 관리자인 경우 토큰 발급
            return await this.getTokenUsecase.execute(systemAdminResult.employee);
        }

        // 일반 사용자 로그인 처리
        const validatedEmployee = await this.validateUsecase.execute(loginDto.email, loginDto.password);

        if (!validatedEmployee) {
            // SSO 로그인 시도
            const ssoResponse = await this.ssoLoginUsecase.execute(loginDto.email, loginDto.password);
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

        // 기존 사용자 정보 반환
        return {
            accessToken: validatedEmployee.accessToken,
            email: validatedEmployee.email,
            name: validatedEmployee.name,
            department: validatedEmployee.department,
            position: validatedEmployee.position,
            roles: validatedEmployee.roles,
        };
    }
}
