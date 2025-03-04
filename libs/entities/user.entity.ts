import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from '@libs/enums/role-type.enum';
import { User as UserDomain } from '@resource/modules/auth/domain/models/user';

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

    @Column()
    password: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    expiredAt: string;

    @Column({ nullable: true, comment: '웹푸시 알림 관련 구독 정보' })
    subscription: string;

    @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER], comment: '사용자 역할' })
    roles: Role[];

    @OneToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;
}
