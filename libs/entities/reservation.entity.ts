import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, Exclusion } from 'typeorm';
import { Resource } from './resource.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { Schedule } from './schedule.entity';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

@Entity('reservations')
export class Reservation {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    reservationId: string;

    @Column()
    resourceId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;

    @Column({
        type: 'enum',
        enum: ReservationStatus,
    })
    status: ReservationStatus;

    @Column({ nullable: true })
    rejectReason: string;

    @Column({ default: false })
    isAllDay: boolean;

    @Column({ default: false })
    notifyBeforeStart: boolean;

    @Column('jsonb', { nullable: true })
    notifyMinutesBeforeStart: number[];

    @ManyToOne(() => Resource)
    @JoinColumn({ name: 'resourceId' })
    resource: Resource;

    @OneToMany(() => ReservationParticipant, (participant) => participant.reservation)
    participants: ReservationParticipant[];

    @OneToMany(() => Schedule, (schedule) => schedule.reservation)
    schedules: Schedule[];
}
