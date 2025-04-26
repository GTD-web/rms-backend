import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@libs/entities';
import { UserService } from '../services/user.service';
import { UserResponseDto } from '@resource/dtos.index';
import * as bcrypt from 'bcrypt';

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
            name: user.employee?.name,
            department: user.employee?.department,
            position: user.employee?.position,
            roles: user.roles,
            isPushNotificationEnabled: user.isPushNotificationEnabled,
        };
    }

    async checkPassword(userId: string, password: string): Promise<boolean> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return bcrypt.compare(password, user.password);
    }

    async changePassword(userId: string, password: string): Promise<void> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userService.update(user);
    }
}
