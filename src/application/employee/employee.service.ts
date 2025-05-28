import { Injectable } from '@nestjs/common';
import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { EmplyeesByDepartmentResponseDto } from '@resource/application/employee/dtos/employees-by-department-response.dto';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';
import {
    GetResourceManagersUsecase,
    GetEmployeeInfoUsecase,
    SyncEmployeeUsecase,
    GetEmployeeListUsecase,
    GetManagerCandidatesUsecase,
    ChangeRoleUsecase,
    GetEmployeeDetailUsecase,
    CheckPasswordUsecase,
    ChangePasswordUsecase,
    ChangeNotificationSettingsUsecase,
} from './usecases';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly getEmployeeInfoUsecase: GetEmployeeInfoUsecase,
        private readonly syncEmployeeUsecase: SyncEmployeeUsecase,
        private readonly getResourceManagersUsecase: GetResourceManagersUsecase,
        private readonly getEmployeeListUsecase: GetEmployeeListUsecase,
        private readonly getManagerCandidatesUsecase: GetManagerCandidatesUsecase,
        private readonly changeRoleUsecase: ChangeRoleUsecase,
        private readonly getEmployeeDetailUsecase: GetEmployeeDetailUsecase,
        private readonly checkPasswordUsecase: CheckPasswordUsecase,
        private readonly changePasswordUsecase: ChangePasswordUsecase,
        private readonly changeNotificationSettingsUsecase: ChangeNotificationSettingsUsecase,
    ) {}

    async syncEmployees(employeeNumber?: string): Promise<void> {
        const employees = await this.getEmployeeInfoUsecase.execute(employeeNumber);
        await this.syncEmployeeUsecase.execute(employees);
    }

    async findResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.getResourceManagersUsecase.execute();
    }

    async findEmployeeList(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.getEmployeeListUsecase.execute();
    }

    async findManagerCandidates(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.getManagerCandidatesUsecase.execute();
    }

    async changeRole(changeRoleDto: ChangeRoleDto): Promise<void> {
        await this.changeRoleUsecase.execute(changeRoleDto);
    }

    async findEmployeeDetail(employeeId: string): Promise<UserResponseDto> {
        return this.getEmployeeDetailUsecase.execute(employeeId);
    }

    async checkPassword(employeeId: string, password: string): Promise<boolean> {
        return this.checkPasswordUsecase.execute(employeeId, password);
    }

    async changePassword(employeeId: string, password: string): Promise<void> {
        return this.changePasswordUsecase.execute(employeeId, password);
    }

    async changeNotificationSettings(
        employeeId: string,
        updateDto: UpdateNotificationSettingsDto,
    ): Promise<UserResponseDto> {
        return this.changeNotificationSettingsUsecase.execute(employeeId, updateDto);
    }
}
