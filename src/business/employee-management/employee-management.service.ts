import { Injectable } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';
import { EmployeeContextService } from '@src/context/employee/employee.context.service';
import { EmplyeesByDepartmentResponseDto } from './dtos/employees-by-department-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { UpdateNotificationSettingsDto } from './dtos/notification-settings.dto';

@Injectable()
export class EmployeeManagementService {
    constructor(private readonly employeeContextService: EmployeeContextService) {}

    onModuleInit() {
        // this.syncSubscription();
    }

    async syncEmployees(authorization: string): Promise<void> {
        await this.employeeContextService.직원_정보를_동기화한다(authorization);
        await this.syncSubscription();
    }

    async syncSubscription(): Promise<void> {
        await this.employeeContextService.구독정보를_동기화한다();
    }

    async findResourceManagers(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeContextService.자원관리자_목록을_조회한다();
    }

    async findManagerCandidates(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeContextService.관리자_후보_목록을_조회한다();
    }

    async changeRole(changeRoleDto: ChangeRoleDto): Promise<any> {
        await this.employeeContextService.직원_역할을_변경한다(changeRoleDto);
        return { success: true };
    }

    async findEmployeeList(): Promise<EmplyeesByDepartmentResponseDto[]> {
        return this.employeeContextService.직원_목록을_조회한다();
    }

    async findEmployeeDetail(employeeId: string): Promise<UserResponseDto> {
        return this.employeeContextService.직원_상세정보를_조회한다(employeeId);
    }

    async checkPassword(employeeId: string, password: string): Promise<any> {
        const isValid = await this.employeeContextService.비밀번호를_확인한다(employeeId, password);
        return { isValid };
    }

    async changePassword(employeeId: string, newPassword: string): Promise<any> {
        await this.employeeContextService.비밀번호를_변경한다(employeeId, newPassword);
        return { success: true };
    }

    async changeNotificationSettings(
        employeeId: string,
        updateDto: UpdateNotificationSettingsDto,
    ): Promise<UserResponseDto> {
        return this.employeeContextService.알림설정을_변경한다(employeeId, updateDto);
    }
}
