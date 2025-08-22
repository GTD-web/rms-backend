import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ScheduleParticipant } from './schedule-participant.entity';
import { ScheduleType } from '@libs/enums/schedule-type.enum';

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

    @Column({
        type: 'enum',
        enum: ScheduleType,
        default: ScheduleType.PERSONAL,
        comment: '일정 유형 (회사전체/부서/개인)',
    })
    scheduleType: ScheduleType;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @OneToMany(() => ScheduleParticipant, (participant) => participant.schedule)
    participants: ScheduleParticipant[];
}
