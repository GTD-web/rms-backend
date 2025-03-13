import { PrimaryColumn, Column, OneToMany, Entity } from 'typeorm';
import { EmployeeNotification } from './employee-notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';

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

    @Column()
    resourceName: string;

    @Column({ nullable: true })
    reservationDate: string;

    @Column({
        type: 'enum',
        enum: NotificationType,
    })
    notificationType: NotificationType;

    @Column({ default: false })
    isRead: boolean;

    @Column()
    createdAt: string;

    @OneToMany(() => EmployeeNotification, (notification) => notification.notification)
    employees: EmployeeNotification[];
}
