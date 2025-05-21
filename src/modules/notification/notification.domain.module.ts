import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, EmployeeNotification } from '@libs/entities';
import { NotificationRepository } from './infrastructure/adapters/out/persistence/notification.repository';
import { EmployeeNotificationRepository } from './infrastructure/adapters/out/persistence/employee-notification.repository';
import { NotificationService } from './application/services/notification.service';
import { EmployeeNotificationService } from './application/services/employee-notification.service';
import { NotificationDomainController } from './infrastructure/adapters/in/domain/controllers/notification.controllers';
import { EmployeeNotificationDomainController } from './infrastructure/adapters/in/domain/controllers/employee-notification.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, EmployeeNotification])],
    providers: [
        NotificationService,
        EmployeeNotificationService,
        NotificationRepository,
        EmployeeNotificationRepository,
        {
            provide: 'NotificationRepositoryPort',
            useClass: NotificationRepository,
        },
        {
            provide: 'EmployeeNotificationRepositoryPort',
            useClass: EmployeeNotificationRepository,
        },
    ],
    controllers: [NotificationDomainController, EmployeeNotificationDomainController],
    exports: [NotificationService, EmployeeNotificationService],
})
export class NotificationDomainModule {}
