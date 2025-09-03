import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';

@Injectable()
export class SubscribeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    isProduction = process.env.NODE_ENV === 'production';

    async execute(employeeId: string, subscription: PushSubscriptionDto): Promise<boolean> {
        try {
            const employee = await this.employeeService.findByEmployeeId(employeeId);
            if (!employee) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.EMPLOYEE.NOT_FOUND);
            }

            if (
                !this.isProduction &&
                employee.subscriptions &&
                Array.isArray(employee.subscriptions) &&
                employee.subscriptions.length > 0
            ) {
                if (employee.subscriptions.length < 2) {
                    employee.subscriptions.push(subscription);
                } else {
                    return false;
                }
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
