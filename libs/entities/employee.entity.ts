import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { EmployeeNotification } from './employee-notification.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { ResourceManager } from './resource-manager.entity';
import { Role } from '@libs/enums/role-type.enum';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
import { ReservationSnapshot } from './reservation-snapshot.entity';
@Entity('employees')
export class Employee {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    employeeId: string;

    @Column()
    name: string;

    @Column()
    employeeNumber: string;

    @Column()
    department: string;

    @Column()
    position: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    expiredAt: string;

    @Column({ type: 'jsonb', nullable: true, comment: '웹푸시 알림 관련 구독 정보 배열' })
    subscriptions: PushSubscriptionDto[];

    @Column({ default: true, comment: '웹푸시 알림 설정 여부' })
    isPushNotificationEnabled: boolean;

    @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER], comment: '사용자 역할' })
    roles: Role[];

    @OneToMany(() => ReservationParticipant, (participant) => participant.employee)
    participants: ReservationParticipant[];

    @OneToMany(() => EmployeeNotification, (notification) => notification.employee)
    notifications: EmployeeNotification[];

    @OneToMany(() => ResourceManager, (resourceManager) => resourceManager.employee)
    resourceManagers: ResourceManager[];
}
