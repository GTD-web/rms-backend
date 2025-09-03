import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { Raw } from 'typeorm';

@Injectable()
export class GetSubscriptionInfoUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async executeByToken(token: string) {
        const employee = await this.employeeService.findOne({
            where: {
                subscriptions: Raw(
                    (alias) => `
                EXISTS (
                  SELECT 1 FROM jsonb_array_elements(${alias}) AS elem
                  WHERE elem -> 'fcm' ->> 'token' = '${token}'
                )
              `,
                ),
            },
            // select: { subscriptions: true },
        });

        return {
            employeeId: employee.employeeId,
            employeeName: employee.name,
            subscriptions: employee.subscriptions,
        };
    }

    async executeByEmployeeId(employeeId: string) {
        const employee = await this.employeeService.findOne({
            where: { employeeId },
            // select: { subscriptions: true },
        });
        return {
            employeeId: employee.employeeId,
            employeeName: employee.name,
            subscriptions: employee.subscriptions,
        };
    }
}
