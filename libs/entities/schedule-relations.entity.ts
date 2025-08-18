import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule_relations')
export class ScheduleRelation {
    @PrimaryGeneratedColumn('uuid')
    scheduleRelationId: string;

    @Column()
    scheduleId: string;

    @Column({ nullable: true })
    reservationId: string;

    @Column({ nullable: true })
    projectId: string;
}
