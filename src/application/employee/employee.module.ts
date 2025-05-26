import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@libs/entities';
import { EmployeeWebhookController } from './controllers/webhook.controller';
import { EmployeeService } from './employee.service';
import { AdminResourceManagerController } from './controllers/admin.resource-manager.controller';
import { SyncEmployeeUsecase } from './usecases/syncEmployee.usecase';
import { GetEmployeeUsecase } from './usecases/getEmployee.usecase';
import { ResourceManagerUseCase } from './usecases/resource-manager.usecase';
import { EmployeeModule as EmployeeDomainModule } from '@src/domain/employee/employee.module';
@Module({
    imports: [EmployeeDomainModule, TypeOrmModule.forFeature([Employee])],
    controllers: [EmployeeWebhookController, AdminResourceManagerController],
    providers: [EmployeeService, GetEmployeeUsecase, SyncEmployeeUsecase, ResourceManagerUseCase],
    exports: [EmployeeService],
})
export class EmployeeModule {}
