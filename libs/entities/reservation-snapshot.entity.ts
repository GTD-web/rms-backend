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

    @Column({ nullable: true })
    step: 'groups' | 'date-time' | 'resources' | 'info';

    @Column({ nullable: true })
    resourceType: string;

    @Column('jsonb', { nullable: true })
    droppableGroupData: {
        id?: string;
        title?: string;
        items?: {
            id?: string;
            title?: string;
            order?: number;
        }[];
    };

    @Column('jsonb', { nullable: true })
    dateRange: {
        from?: Date;
        to?: Date;
    };

    @Column('jsonb', { nullable: true })
    startTime: {
        hour?: number;
        minute?: number;
    };

    @Column('jsonb', { nullable: true })
    endTime: {
        hour?: number;
        minute?: number;
    };

    @Column('jsonb', { nullable: true })
    timeRange: {
        am?: boolean;
        pm?: boolean;
    };

    @Column({ nullable: true })
    timeUnit: number;

    @Column('jsonb', { nullable: true })
    selectedResource: {
        resourceId?: string;
        resourceName?: string;
        startDate?: Date;
        endDate?: Date;
    };

    @Column({ nullable: true })
    title: string;

    @Column('jsonb', { nullable: true })
    reminderTimes: {
        id?: string;
        time?: number;
        isSelected?: boolean;
    }[];

    @Column({ default: false })
    isAllDay: boolean;

    @Column({ default: false })
    notifyBeforeStart: boolean;

    @Column('jsonb', { nullable: true })
    notifyMinutesBeforeStart: number[];

    @Column('jsonb', { nullable: true })
    attendees: {
        id?: string;
        name?: string;
        department?: string;
    }[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
