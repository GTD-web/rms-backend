import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Consumable } from './consumable.entity';

@Entity('maintenances')
export class Maintenance {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    maintenanceId: string;

    @Column()
    consumableId: string;

    @Column()
    date: string;

    @Column({ nullable: true })
    mileage: number;

    @Column({ nullable: true })
    cost: number;

    @Column({ type: 'json', nullable: true, comment: '정비사진 배열' })
    images: string[];

    @ManyToOne(() => Consumable)
    @JoinColumn({ name: 'consumableId' })
    consumable: Consumable;
}
