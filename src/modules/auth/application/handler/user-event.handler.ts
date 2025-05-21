import { OnEvent } from '@nestjs/event-emitter';
import { Role } from '@libs/enums/role-type.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { UserService } from '../services/user.service';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';
import { In, Raw } from 'typeorm';

@Injectable()
export class UserEventHandler {
    constructor(private readonly userService: UserService) {}
    // 이벤트 수신 예시 메서드
    @OnEvent('add.user.role')
    async handleUserRoleAddedEvent(payload: { employeeId: string; role: Role; repositoryOptions?: RepositoryOptions }) {
        console.log(`Role ${payload.role} added to user ${payload.employeeId}`);
        // 역할 추가 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        if (!user.roles.includes(payload.role)) {
            user.roles.push(payload.role);
            await this.userService.update(user, payload.repositoryOptions);
        }
    }

    @OnEvent('remove.user.role')
    async handleUserRoleRemovedEvent(payload: {
        employeeId: string;
        role: Role;
        repositoryOptions?: RepositoryOptions;
    }) {
        console.log(`Role ${payload.role} removed from user ${payload.employeeId}`);
        // 역할 제거 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        user.roles = user.roles.filter((r) => r !== payload.role);
        await this.userService.update(user, payload.repositoryOptions);
    }

    @OnEvent('update.user.subscription')
    async handleUserSubscriptionUpdateEvent(payload: {
        userId: string;
        subscription: PushNotificationSubscription | null;
        // repositoryOptions?: RepositoryOptions;
    }) {
        try {
            console.log(`Subscription updated for user ${payload.userId} ${payload.subscription}`);
            // 구독 정보 업데이트 이벤트에 대한 처리 로직
            const user = await this.userService.findByUserId(payload.userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            if (user.subscriptions) {
                if (user.subscriptions.length > 4) {
                    user.subscriptions.shift();
                }
                user.subscriptions.push(payload.subscription);
            } else {
                user.subscriptions = [payload.subscription];
            }
            await this.userService.update(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    @OnEvent('filter.user.subscription')
    async handleUserSubscriptionFilterEvent(payload: {
        employeeId: string;
        subscriptions: PushNotificationSubscription[];
        // repositoryOptions?: RepositoryOptions;
    }) {
        console.log(`Subscription filtered for user ${payload.employeeId} ${payload.subscriptions}`);
        // 구독 정보 업데이트 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.subscriptions = payload.subscriptions;
        await this.userService.update(user);
    }

    @OnEvent('update.user.mobile')
    async handleUserMobileUpdateEvent(payload: {
        employeeId: string;
        mobile: string;
        // repositoryOptions?: RepositoryOptions;
    }) {
        console.log(`Mobile updated for user ${payload.employeeId} ${payload.mobile}`);
        // 구독 정보 업데이트 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.mobile = payload.mobile;
        await this.userService.update(user);
    }

    @OnEvent('find.user')
    async handleUserGetEvent(payload: { employeeId?: string; userId?: string }) {
        console.log(`User found for employeeId ${payload.employeeId} or userId ${payload.userId}`);
        // 사용자 조회 이벤트에 대한 처리 로직
        if (payload.employeeId) {
            return await this.userService.findByEmployeeId(payload.employeeId);
        }
        if (payload.userId) {
            return await this.userService.findByUserId(payload.userId);
        }
        return null;
    }

    @OnEvent('find.user.subscription')
    async handleUserSubscriptionGetEvent(payload: { employeeId: string }) {
        console.log(`Find subscription for user ${payload.employeeId}`);
        // 구독 정보 제거 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (user && user.isPushNotificationEnabled && user.subscriptions) {
            return user.subscriptions;
        }
        return null;
    }

    @OnEvent('find.user.system.admin')
    async handleFindSystemAdminEvent() {
        const systemAdmin = await this.userService.findAll({
            where: {
                roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
            },
        });
        return systemAdmin;
    }
}
