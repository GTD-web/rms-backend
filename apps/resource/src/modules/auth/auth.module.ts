import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthUsecase } from './application/usecases/jwt-auth.usecase';
import { SsoAuthUsecase } from './application/usecases/sso-auth.usecase';
import { AuthController } from './infrastructure/adapters/in/web/controllers/auth.controller';
import { UserRepository } from './infrastructure/adapters/out/user.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { User, Employee } from '@libs/entities';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/adapters/in/web/controllers/user.controller';
import { UserUsecase } from './application/usecases/user.usecase';
import { UserEventHandler } from './application/handler/user-event.handler';
import { ResourceManagerController } from './infrastructure/adapters/in/web/controllers/resource-manager.controller';
import { ResourceManagerUseCase } from './application/usecases/resource-manager.usecase';
import { UserAuthController } from './infrastructure/adapters/in/web/controllers/v1/auth.controller';
import { UserUserController } from './infrastructure/adapters/in/web/controllers/v1/user.controller';
import { AdminUserController } from './infrastructure/adapters/in/web/controllers/v1/admin.user.controller';
import { AdminResourceManagerController } from './infrastructure/adapters/in/web/controllers/v1/admin.resource-manager.controller';

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
        UserEventHandler,
        ResourceManagerUseCase,
    ],
    controllers: [
        AuthController,
        UserController,
        ResourceManagerController,
        UserAuthController,
        UserUserController,
        AdminUserController,
        AdminResourceManagerController,
    ],
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
