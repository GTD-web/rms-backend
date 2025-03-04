import { User as UserEntity } from '@libs/entities';
import { User as UserDomain } from '@resource/modules/auth/domain/models/user';

export class UserMapper {
    static toDomain(entity: UserEntity): UserDomain {
        return new UserDomain({
            userId: entity.userId,
            employeeId: entity.employeeId,
            email: entity.email,
            password: entity.password,
            accessToken: entity.accessToken,
            expiredAt: entity.expiredAt,
            subscription: entity.subscription,
            roles: entity.roles,
            name: entity.employee?.name,
            employeeNumber: entity.employee?.employeeNumber,
            department: entity.employee?.department,
            position: entity.employee?.position,
        });
    }

    static toEntity(domain: UserDomain): Partial<UserEntity> {
        const props = domain.toJSON();
        return {
            userId: props.userId,
            employeeId: props.employeeId,
            email: props.email,
            password: props.password,
            accessToken: props.accessToken,
            expiredAt: props.expiredAt,
            subscription: props.subscription,
            roles: props.roles,
        };
    }
}
