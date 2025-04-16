import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '@resource/modules/auth/domain/ports/user.repository.port';
import { Role } from '@libs/enums/role-type.enum';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { User } from '@libs/entities';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort,
    ) {}

    async findAll(repositoryOptions?: RepositoryOptions): Promise<User[]> {
        const users = await this.userRepository.find(repositoryOptions);
        return users;
    }

    async findByEmployeeId(employeeId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['employee'] });
        return user;
    }

    async findByUserId(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { userId }, relations: ['employee'] });
        return user;
    }

    async save(user: User, repositoryOptions?: RepositoryOptions): Promise<User> {
        const savedUser = await this.userRepository.save(user, repositoryOptions);
        return savedUser;
    }

    async update(user: User, repositoryOptions?: RepositoryOptions): Promise<User> {
        const updatedUser = await this.userRepository.update(user.userId, user, repositoryOptions);
        return updatedUser;
    }

    async addRole(employeeId: string, role: Role, repositoryOptions?: RepositoryOptions): Promise<void> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        if (!user.roles.includes(role)) {
            user.roles.push(role);
            await this.userRepository.update(user.userId, user, repositoryOptions);
        }
    }

    async removeRole(employeeId: string, role: Role, repositoryOptions?: RepositoryOptions): Promise<void> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        user.roles = user.roles.filter((r) => r !== role);
        await this.userRepository.update(user.userId, user, repositoryOptions);
    }
}
