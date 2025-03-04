import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Resource } from './resource.entity';
import { Consumable } from './consumable.entity';

@Entity('vehicle_infos')
export class VehicleInfo {
  @PrimaryColumn('uuid', {
    generated: 'uuid',
  })
  vehicleInfoId: string;

  @Column()
  resourceId: string;

  @Column({ nullable: true })
  leftMileage: string;

  @Column({ nullable: true })
  totalMileage: string;

  @Column({ nullable: true })
  insuranceName: string;

  @Column({ nullable: true })
  insuranceNumber: string;

  @Column({ type: 'jsonb', nullable: true, comment: '주차위치 이미지 배열' })
  parkingLocationImages: string[];

  @Column({ type: 'jsonb', nullable: true, comment: '계기판 이미지 배열' })
  odometerImages: string[];

  @OneToOne(() => Resource, resource => resource.vehicleInfo)
  @JoinColumn({ name: `resourceId` })
  resource: Resource;

  @OneToMany(() => Consumable, consumable => consumable.vehicleInfo)
  consumables: Consumable[];
} 