import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';

@Injectable()
export class MarkAsReadUsecase {
    constructor(private readonly employeeNotificationService: DomainEmployeeNotificationService) {}

    async execute(employeeId: string, notificationId: string): Promise<void> {
        const employeeNotification = await this.employeeNotificationService.findOne({
            where: {
                employeeId,
                notificationId,
            },
        });
        if (!employeeNotification) {
            throw new BadRequestException('There is no data');
        }
        await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
            isRead: true,
        });
    }
}
