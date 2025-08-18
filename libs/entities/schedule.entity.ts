import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ScheduleParticipant } from './schedule-participant.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    scheduleId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp with time zone' })
    startDate: Date;

    @Column({ type: 'timestamp with time zone' })
    endDate: Date;

    @Column({ default: false })
    notifyBeforeStart: boolean;

    @Column('jsonb', { nullable: true })
    notifyMinutesBeforeStart: number[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @OneToMany(() => ScheduleParticipant, (participant) => participant.schedule)
    participants: ScheduleParticipant[];
}
