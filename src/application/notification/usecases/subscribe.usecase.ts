import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';

@Injectable()
export class SubscribeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string, subscription: PushSubscriptionDto): Promise<boolean> {
        try {
            const employee = await this.employeeService.findByEmployeeId(employeeId);
            if (!employee) {
                throw new NotFoundException(ERROR_MESSAGE.BUSINESS.EMPLOYEE.NOT_FOUND);
            }
            employee.subscriptions = [subscription];
            await this.employeeService.update(employee.employeeId, employee);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
