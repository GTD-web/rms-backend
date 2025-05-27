import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/adapters/out/user.repository';
import { User, Employee } from '@libs/entities';
import { UserService } from './application/services/user.service';
import { UserEventHandler } from './application/handler/user-event.handler';

@Module({
    imports: [TypeOrmModule.forFeature([User, Employee])],
    providers: [
        UserService,
        UserRepository,
        {
            provide: 'UserRepositoryPort',
            useClass: UserRepository,
        },
        UserEventHandler,
    ],
    controllers: [],
    exports: [UserService],
})
export class AuthModule {}
