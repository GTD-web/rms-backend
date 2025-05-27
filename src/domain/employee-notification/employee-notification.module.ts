import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeNotification } from '@libs/entities/employee-notification.entity';
import { EmployeeNotificationService } from './employee-notification.service';
import { EmployeeNotificationRepository } from './employee-notification.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeNotification])],
    providers: [EmployeeNotificationService, EmployeeNotificationRepository],
    exports: [EmployeeNotificationService],
})
export class EmployeeNotificationModule {}
