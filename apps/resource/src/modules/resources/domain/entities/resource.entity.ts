import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    status: string;

    // ... 추가 필드 정의
}
