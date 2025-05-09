import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@libs/entities';
import { UserService } from '../services/user.service';
import { EmployeeResponseDto, EmplyeesByDepartmentResponseDto, UserResponseDto } from '@resource/dtos.index';
import * as bcrypt from 'bcrypt';
import { UpdateNotificationSettingsDto } from '../dto/notification-settings.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Not } from 'typeorm';
import { In } from 'typeorm';
import { Role } from '@libs/enums/role-type.enum';
import { ChangeRoleDto } from '../dto/change-role.dto';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async findByUserId(userId: string): Promise<UserResponseDto> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
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
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        return bcrypt.compare(password, user.password);
    }

    async changePassword(userId: string, password: string): Promise<void> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userService.update(user);
    }

    async changeNotificationSettings(
        userId: string,
        updateDto: UpdateNotificationSettingsDto,
    ): Promise<UserResponseDto> {
        const user = await this.userService.findByUserId(userId);
        if (!user) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        user.isPushNotificationEnabled = updateDto.isPushNotificationEnabled;
        await this.userService.update(user);
        return this.findByUserId(userId);
    }

    async findAll(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const users = await this.userService.findAll({
            where: {
                employee: {
                    department: Not(In(['퇴사', '관리자'])),
                },
            },
            relations: ['employee'],
        });
        const departments = new Map<string, EmployeeResponseDto[]>();

        users.forEach((resourceManager) => {
            if (!departments.has(resourceManager.employee.department)) {
                departments.set(resourceManager.employee.department, []);
            }
            const data = {
                ...resourceManager.employee,
                isResourceAdmin: resourceManager.roles.includes(Role.RESOURCE_ADMIN),
            };
            departments.get(resourceManager.employee.department)?.push(data);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }

    async changeRole(changeRoleDto: ChangeRoleDto): Promise<void> {
        const user = await this.userService.findByUserId(changeRoleDto.userId);
        if (!user) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }
        user.roles = changeRoleDto.isResourceAdmin
            ? [...user.roles, Role.RESOURCE_ADMIN]
            : user.roles.filter((role) => role !== Role.RESOURCE_ADMIN);
        await this.userService.update(user);
    }
}
