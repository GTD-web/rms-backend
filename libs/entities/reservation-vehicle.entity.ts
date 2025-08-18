import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { VehicleInfo } from './vehicle-info.entity';

@Entity('reservation_vehicles')
export class ReservationVehicle {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    reservationVehicleId: string;

    @Column()
    reservationId: string;

    @Column()
    vehicleInfoId: string;

    @Column({ nullable: true })
    startOdometer: number;

    @Column({ nullable: true })
    endOdometer: number;

    @Column({ nullable: true })
    startFuelLevel: number;

    @Column({ nullable: true })
    endFuelLevel: number;

    @Column({ default: false })
    isReturned: boolean;

    @Column({ type: 'timestamp with time zone', nullable: true })
    returnedAt: Date;

    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservationId' })
    reservation: Reservation;

    @ManyToOne(() => VehicleInfo)
    @JoinColumn({ name: 'vehicleInfoId' })
    vehicleInfo: VehicleInfo;

    @Column({ type: 'jsonb', nullable: true })
    location: any;

    @Column({ nullable: true })
    returnedBy: string;
}
