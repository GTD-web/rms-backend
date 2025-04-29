import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
// import { VehicleConsumableItem } from './vehicle-consumable-item.entity';

@Entity('consumable_items')
export class ConsumableItem {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    consumableItemId: string;

    @Column({ unique: true })
    name: string;

    @Column({ default: 0 })
    recommendedReplaceCycle: number;

    @Column({ nullable: true })
    description: string;

    // @OneToMany(() => VehicleConsumableItem, (vci) => vci.consumableItem)
    // vehicleConsumableItems: VehicleConsumableItem[];
}
