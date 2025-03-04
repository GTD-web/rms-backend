import { PrimaryColumn, Column, OneToMany, Entity } from "typeorm";
import { EmployeeNotification } from "./employee-notification.entity";
import { NotificationType } from "@libs/enums/notification-type.enum";
import { ResourceType } from "@libs/enums/resource-type.enum";

@Entity('notifications')
export class Notification {
  @PrimaryColumn('uuid', {
    generated: 'uuid',
  })
  notificationId: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    type: 'enum',
    enum: NotificationType
  })
  notificationType: NotificationType;

  @Column({
    type: 'enum',
    enum: ResourceType
  })
  resourceType: ResourceType;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: Date;

  @OneToMany(() => EmployeeNotification, notification => notification.notification)
  employees: EmployeeNotification[];
}

