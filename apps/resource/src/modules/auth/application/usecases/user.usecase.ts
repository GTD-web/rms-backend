import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@resource/modules/auth/domain/models/user';
import { UserService } from '../services/user.service';
import { UserResponseDto } from '@resource/dtos.index';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async findByUserId(userId: string): Promise<UserResponseDto> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            userId: user.userId,
            email: user.email,
            mobile: user.mobile,
            name: user.name,
            department: user.department,
            position: user.position,
            roles: user.roles,
        };
    }

    async checkPassword(userId: string, password: string): Promise<boolean> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.checkPassword(password);
    }

    async changePassword(userId: string, password: string): Promise<void> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.updatePassword(password);
        await this.userService.update(user);
    }
}
