import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '@libs/entities/user.entity';
import { ValidateUsecase } from './usecases/validate.usecase';
import { LoginUsecase } from './usecases/login.usecase';
import { LoginDto } from '@src/modules/auth/application/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly validateUsecase: ValidateUsecase,
        private readonly loginUsecase: LoginUsecase,
    ) {}

    async login(loginDto: LoginDto) {
        const validatedUser = await this.validateUsecase.execute(loginDto.email, loginDto.password);
        return this.loginUsecase.execute(validatedUser);
    }
}
