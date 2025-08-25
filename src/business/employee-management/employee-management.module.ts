import { Module } from '@nestjs/common';
import { ResourceManagerController } from './controllers/resource-manager.controller';
import { EmployeeController } from './controllers/employee.controller';
import { UserController } from './controllers/user.controller';
import { EmployeeManagementService } from './employee-management.service';
import { EmployeeContextModule } from '@src/context/employee/employee.context.module';

@Module({
    imports: [EmployeeContextModule],
    controllers: [ResourceManagerController, EmployeeController, UserController],
    providers: [EmployeeManagementService],
    exports: [EmployeeManagementService],
})
export class EmployeeManagementModule {}
