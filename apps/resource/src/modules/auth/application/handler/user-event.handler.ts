import { OnEvent } from '@nestjs/event-emitter';
import { Role } from '@libs/enums/role-type.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { UserService } from '../services/user.service';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';

@Injectable()
export class UserEventHandler {
    constructor(private readonly userService: UserService) {}
    // 이벤트 수신 예시 메서드
    @OnEvent('add.user.role')
    async handleUserRoleAddedEvent(payload: { employeeId: string; role: Role; repositoryOptions?: RepositoryOptions }) {
        console.log(`Role ${payload.role} added to user ${payload.employeeId}`);
        // 역할 추가 이벤트에 대한 처리 로직
        await this.userService.addRole(payload.employeeId, payload.role, payload.repositoryOptions);
    }

    @OnEvent('remove.user.role')
    async handleUserRoleRemovedEvent(payload: {
        employeeId: string;
        role: Role;
        repositoryOptions?: RepositoryOptions;
    }) {
        console.log(`Role ${payload.role} removed from user ${payload.employeeId}`);
        // 역할 제거 이벤트에 대한 처리 로직
        await this.userService.removeRole(payload.employeeId, payload.role, payload.repositoryOptions);
    }

    @OnEvent('update.user.subscription')
    async handleUserSubscriptionUpdateEvent(payload: {
        userId: string;
        subscription: PushNotificationSubscription | null;
        // repositoryOptions?: RepositoryOptions;
    }) {
        console.log(`Subscription updated for user ${payload.userId} ${payload.subscription}`);
        // 구독 정보 업데이트 이벤트에 대한 처리 로직
        const user = await this.userService.findByUserId(payload.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.subscription = payload.subscription;
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
        console.log(`Subscription removed for user ${payload.employeeId}`);
        // 구독 정보 제거 이벤트에 대한 처리 로직
        const user = await this.userService.findByEmployeeId(payload.employeeId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user.subscription;
    }
}
