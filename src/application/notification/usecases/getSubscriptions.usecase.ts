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
        console.log('알림 구독 정보', employee);
        if (!employee) {
            return [];
        }
        return employee.subscriptions;
    }
}
