import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@libs/entities';
import { EmployeeWebhookController } from './controllers/webhook.controller';
import { EmployeeService } from './employee.service';
import { AdminResourceManagerController } from './controllers/admin.resource-manager.controller';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import {
    GetEmployeeInfoUsecase,
    SyncEmployeeUsecase,
    GetResourceManagersUsecase,
    GetEmployeeListUsecase,
    GetManagerCandidatesUsecase,
    ChangeRoleUsecase,
    GetEmployeeDetailUsecase,
    CheckPasswordUsecase,
    ChangePasswordUsecase,
    ChangeNotificationSettingsUsecase,
} from './usecases';
import { AdminUserController } from './controllers/admin.user.controller';
import { UserEmployeeController } from './controllers/employee.controller';
import { UserUserController } from './controllers/user.controller';

@Module({
    imports: [DomainEmployeeModule, TypeOrmModule.forFeature([Employee])],
    controllers: [
        // EmployeeWebhookController,
        AdminResourceManagerController,
        AdminUserController,
        UserEmployeeController,
        UserUserController,
    ],
    providers: [
        EmployeeService,
        GetEmployeeInfoUsecase,
        SyncEmployeeUsecase,
        GetResourceManagersUsecase,
        GetEmployeeListUsecase,
        GetManagerCandidatesUsecase,
        ChangeRoleUsecase,
        GetEmployeeDetailUsecase,
        CheckPasswordUsecase,
        ChangePasswordUsecase,
        ChangeNotificationSettingsUsecase,
    ],
    exports: [EmployeeService],
})
export class EmployeeModule {}
