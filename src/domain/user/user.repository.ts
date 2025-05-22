import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/entities/user.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(repository);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({ where: { email }, relations: ['employee'] });
    }

    async findByUserId(userId: string): Promise<User | null> {
        return this.findOne({ where: { userId }, relations: ['employee'] });
    }
}
