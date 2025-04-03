import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    scheduleId: string;

    @Column()
    reservationId: string;

    @Column()
    year: string;

    @Column()
    month: string;

    @Column()
    day: string;

    @Column({ comment: '0 ~ 1439 분으로 표시' })
    startDateTime: string;

    @Column({ comment: '0 ~ 1439 분으로 표시' })
    endDateTime: string;

    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservationId' })
    reservation: Reservation;
}
