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

    @Column({ type: 'timestamp with time zone', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    endDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    startTime: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    am: boolean;

    @Column({ nullable: true })
    pm: boolean;

    @Column({ nullable: true })
    timeUnit: number;

    @Column({ nullable: true })
    resourceId: string;

    @Column({ nullable: true })
    resourceName: string;

    @Column({ type: 'timestamp with time zone', nullable: true })
    selectedStartDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    selectedEndDate: Date;

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
