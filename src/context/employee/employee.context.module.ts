import { Module } from '@nestjs/common';
import { EmployeeContextService } from './employee.context.service';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';

@Module({
    imports: [DomainEmployeeModule],
    providers: [EmployeeContextService],
    exports: [EmployeeContextService],
})
export class EmployeeContextModule {}
