import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '@resource/modules/auth/domain/ports/user.repository.port';
import { Role } from '@libs/enums/role-type.enum';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '@resource/modules/auth/domain/models/user';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort,
    ) {}

    async findAll(repositoryOptions?: RepositoryOptions): Promise<User[]> {
        const users = await this.userRepository.find(repositoryOptions);
        return users.map((user) => UserMapper.toDomain(user));
    }

    async findByEmployeeId(employeeId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['employee'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async findByUserId(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { userId }, relations: ['employee'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async save(user: User, repositoryOptions?: RepositoryOptions): Promise<User> {
        const userEntity = UserMapper.toEntity(user);
        const savedUser = await this.userRepository.save(userEntity, repositoryOptions);
        return UserMapper.toDomain(savedUser);
    }

    async update(user: User, repositoryOptions?: RepositoryOptions): Promise<User> {
        const userEntity = UserMapper.toEntity(user);
        const updatedUser = await this.userRepository.update(user.userId, userEntity, repositoryOptions);
        return UserMapper.toDomain(updatedUser);
    }

    async addRole(employeeId: string, role: Role, repositoryOptions?: RepositoryOptions): Promise<void> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const userDomain = UserMapper.toDomain(user);
        userDomain.addRole(role);
        await this.userRepository.update(user.userId, UserMapper.toEntity(userDomain), repositoryOptions);
    }

    async removeRole(employeeId: string, role: Role, repositoryOptions?: RepositoryOptions): Promise<void> {
        const user = await this.userRepository.findOne({ where: { employeeId }, relations: ['employee'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const userDomain = UserMapper.toDomain(user);
        userDomain.removeRole(role);
        await this.userRepository.update(user.userId, UserMapper.toEntity(userDomain), repositoryOptions);
    }
}
