import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Notification } from '@libs/entities';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class SaveNotificationUsecase {
    constructor(
        private readonly notificationService: DomainNotificationService,
        private readonly employeeNotificationService: DomainEmployeeNotificationService,
    ) {}

    async execute(
        createNotificationDto: CreateNotificationDto,
        notiTarget: string[],
        repositoryOptions?: IRepositoryOptions<Notification>,
    ) {
        const notification = await this.notificationService.save(createNotificationDto, repositoryOptions);
        // employee 와 연결 필요
        for (const employeeId of notiTarget) {
            await this.employeeNotificationService.save(
                {
                    employeeId: employeeId,
                    notificationId: notification.notificationId,
                },
                repositoryOptions,
            );
        }
        return notification;
    }
}
