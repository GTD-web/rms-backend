import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { Resource } from './resource.entity';

@Entity('reservation_snapshots')
export class ReservationSnapshot {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    snapshotId: string;

    @Column()
    userId: string;

    @Column('jsonb', { nullable: true })
    resource: {
        resourceId: string;
        name: string;
    };

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp with time zone', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    endDate: Date;

    @Column({ default: false })
    isAllDay: boolean;

    @Column({ default: false })
    notifyBeforeStart: boolean;

    @Column('jsonb', { nullable: true })
    notifyMinutesBeforeStart: number[];

    @Column('jsonb', { nullable: true })
    participants: {
        employeeId: string;
        name: string;
        department: string;
    }[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
