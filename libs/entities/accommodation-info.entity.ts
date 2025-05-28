import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resource } from './resource.entity';

@Entity('accommodation_infos')
export class AccommodationInfo {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    accommodationInfoId: string;

    @Column()
    resourceId: string;

    @OneToOne(() => Resource, (resource) => resource.accommodationInfo)
    @JoinColumn({ name: 'resourceId' })
    resource: Resource;
}
