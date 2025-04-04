import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

    @Column({ default: 0 })
    mileage: number;

    @Column({ default: 0 })
    cost: number;

    @Column({ type: 'json', nullable: true, comment: '정비사진 배열' })
    images: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Consumable)
    @JoinColumn({ name: 'consumableId' })
    consumable: Consumable;
}
