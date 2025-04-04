import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { VehicleInfo } from './vehicle-info.entity';
import { Maintenance } from './maintenance.entity';

@Entity('consumables')
export class Consumable {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    consumableId: string;

    @Column()
    vehicleInfoId: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    replaceCycle: number;

    @Column({ default: true })
    notifyReplacementCycle: boolean;

    @ManyToOne(() => VehicleInfo)
    @JoinColumn({ name: 'vehicleInfoId', referencedColumnName: 'vehicleInfoId' })
    vehicleInfo: VehicleInfo;

    @OneToMany(() => Maintenance, (maintenance) => maintenance.consumable)
    maintenances: Maintenance[];
}
