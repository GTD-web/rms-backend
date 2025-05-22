import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseService } from '@libs/services/base.service';
import { User } from '@libs/entities/user.entity';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }

    async findByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }
}
