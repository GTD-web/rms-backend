import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from '../../domain/interfaces/user.interface';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async create(userData: Partial<IUser>) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
    }

    async update(id: string, userData: Partial<IUser>) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return this.userRepository.update(id, userData);
    }
}
