import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ResourceGroup } from './resource-group.entity';
import { VehicleInfo } from './vehicle-info.entity';
import { MeetingRoomInfo } from './meeting-room-info.entity';
import { AccommodationInfo } from './accommodation-info.entity';
import { Reservation } from './reservation.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
export interface ResourceLocation {
    address: string;
    detailAddress?: string;
}

@Entity('resources')
export class Resource {
    @PrimaryColumn('uuid', {
        generated: 'uuid', // UUID 자동 생성
    })
    resourceId: string;

    @Column('uuid')
    resourceGroupId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('jsonb', { nullable: true })
    location: ResourceLocation;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ nullable: true })
    unavailableReason: string;

    @Column('jsonb')
    images: string[];

    @Column({ default: true })
    notifyParticipantChange: boolean;

    @Column({ default: true })
    notifyReservationChange: boolean;

    @Column({ type: 'enum', enum: ResourceType })
    type: ResourceType;

    @ManyToOne(() => ResourceGroup)
    @JoinColumn({ name: 'resourceGroupId' })
    resourceGroup: ResourceGroup;

    @OneToOne(() => VehicleInfo, (vehicleInfo) => vehicleInfo.resource)
    vehicleInfo: VehicleInfo;

    @OneToOne(() => MeetingRoomInfo, (meetingRoomInfo) => meetingRoomInfo.resource)
    meetingRoomInfo: MeetingRoomInfo;

    @OneToOne(() => AccommodationInfo, (accommodationInfo) => accommodationInfo.resource)
    accommodationInfo: AccommodationInfo;

    @OneToMany(() => Reservation, (reservation) => reservation.resource)
    reservations: Reservation[];
}
