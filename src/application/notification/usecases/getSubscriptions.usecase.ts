import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { Raw } from 'typeorm';

@Injectable()
export class GetSubscriptionsUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employeeId: string): Promise<PushSubscriptionDto[]> {
        const employee = await this.employeeService.findOne({
            where: { employeeId },
            select: { subscriptions: true },
        });
        if (
            !employee ||
            !employee.subscriptions ||
            employee.subscriptions.length === 0 ||
            !employee.isPushNotificationEnabled
        ) {
            return [];
        }
        return employee.subscriptions;
    }
}
