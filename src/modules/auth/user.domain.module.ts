import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/adapters/out/user.repository';
import { User } from '@libs/entities';
import { UserService } from './application/services/user.service';
import { UserDomainController } from './infrastructure/adapters/in/domain/controllers/user.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        UserRepository,
        {
            provide: 'UserRepositoryPort',
            useClass: UserRepository,
        },
    ],
    controllers: [UserDomainController],
    exports: [UserService],
})
export class UserDomainModule {}
