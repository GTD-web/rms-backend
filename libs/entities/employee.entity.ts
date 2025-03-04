import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { EmployeeNotification } from './employee-notification.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { User } from './user.entity';

@Entity('employees')
export class Employee {
  @PrimaryColumn('uuid', {
    generated: 'uuid',
  })
  employeeId: string;

  @Column()
  name: string;

  @Column()
  employeeNumber: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ReservationParticipant, participant => participant.employee)
  participants: ReservationParticipant[];

  @OneToMany(() => EmployeeNotification, notification => notification.employee)
  notifications: EmployeeNotification[];
} 