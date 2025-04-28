import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from '@libs/enums/role-type.enum';
import { PushNotificationSubscription } from '@resource/modules/notification/domain/ports/push-notification.port';
import { ApiProperty } from '@nestjs/swagger';
@Entity('users')
export class User {
    @PrimaryColumn('uuid', {
        generated: 'uuid', // UUID 자동 생성
    })
    userId: string;

    @Column({ nullable: true })
    employeeId: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    mobile: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    expiredAt: string;

    @Column({ type: 'jsonb', nullable: true, comment: '웹푸시 알림 관련 구독 정보' })
    subscription: PushNotificationSubscription;

    @Column({ type: 'jsonb', nullable: true, comment: '웹푸시 알림 관련 구독 정보 배열' })
    subscriptions: PushNotificationSubscription[];

    @Column({ default: true, comment: '웹푸시 알림 설정 여부' })
    isPushNotificationEnabled: boolean;

    @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER], comment: '사용자 역할' })
    roles: Role[];

    @OneToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;
}
