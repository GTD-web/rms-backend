import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resource } from './resource.entity';

@Entity('tester_infos')
export class TesterInfo {
    @PrimaryGeneratedColumn('uuid')
    testerInfoId: string;

    @Column()
    resourceId: string;

    @OneToOne(() => Resource, (resource) => resource.testerInfo)
    @JoinColumn({ name: 'resourceId' })
    resource: Resource;
}
