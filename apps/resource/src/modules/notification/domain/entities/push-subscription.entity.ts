import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('push_subscriptions')
export class PushSubscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column('json')
    subscription: Record<string, any>;

    @Column({ default: true })
    isActive: boolean;
}
