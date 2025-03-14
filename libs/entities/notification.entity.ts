import { PrimaryColumn, Column, OneToMany, Entity } from 'typeorm';
import { EmployeeNotification } from './employee-notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';

export interface NotificationData {
    reservationId?: string;
    reservationTitle?: string;
    reservationDate?: string;
    beforeMinutes?: number;
    resourceId?: string;
    resourceName?: string;
    resourceType?: ResourceType;
    consumableName?: string;
}

@Entity('notifications')
export class Notification {
    @PrimaryColumn('uuid', {
        generated: 'uuid',
    })
    notificationId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    body: string;

    @Column({
        type: 'enum',
        enum: NotificationType,
        nullable: true,
    })
    notificationType: NotificationType;

    @Column('jsonb', { nullable: true })
    notificationData: NotificationData;

    @Column({ default: true })
    isSent: boolean;

    @Column()
    createdAt: string;

    @OneToMany(() => EmployeeNotification, (notification) => notification.notification)
    employees: EmployeeNotification[];
}
