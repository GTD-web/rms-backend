import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushNotificationSubscription } from '@src/modules/notification/domain/ports/push-notification.port';

@Injectable()
export class SubscribeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, subscription: PushNotificationSubscription): Promise<boolean> {
        try {
            const employee = await this.employeeService.findByEmployeeId(employeeId);
            if (!employee) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.EMPLOYEE.NOT_FOUND);
            }
            if (employee.subscriptions) {
                if (employee.subscriptions.length > 4) {
                    employee.subscriptions.shift();
                }
                employee.subscriptions.push(subscription);
            } else {
                employee.subscriptions = [subscription];
            }
            await this.employeeService.update(employee.employeeId, employee);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
