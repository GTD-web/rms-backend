import { Injectable } from '@nestjs/common';
import { EmployeeContextService } from '@src/context/employee/employee.context.service';
import { EmplyeesByDepartmentResponseDto } from './dtos/employees-by-department-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { UpdateNotificationSettingsDto } from './dtos/notification-settings.dto';
import { DepartmentListResponseDto, DepartmentHierarchyResponseDto } from './dtos/department-response.dto';

@Injectable()
export class EmployeeManagementService {
    constructor(private readonly employeeContextService: EmployeeContextService) {}

    async syncEmployees(authorization: string): Promise<void> {
        await this.employeeContextService.전체_조직_정보를_동기화한다(authorization);
        // await this.employeeContextService.구독정보를_동기화한다();
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

    async findAllDepartments(): Promise<DepartmentListResponseDto> {
        const departments = await this.employeeContextService.모든_부서를_조회한다();

        return {
            departments: departments,
            totalCount: departments.length,
        };
    }

    async findSubDepartments(): Promise<DepartmentListResponseDto> {
        const departments = await this.employeeContextService.하위_부서_목록을_조회한다();

        return {
            departments: departments,
            totalCount: departments.length,
        };
    }

    async findRootDepartments(): Promise<DepartmentListResponseDto> {
        const departments = await this.employeeContextService.루트_부서_목록을_조회한다();

        return {
            departments: departments,
            totalCount: departments.length,
        };
    }

    async findDepartmentHierarchy(): Promise<DepartmentHierarchyResponseDto> {
        const hierarchy = await this.employeeContextService.부서_계층구조를_조회한다();

        // 총 부서 수 계산 (재귀적으로)
        const calculateTotalCount = (depts: any[]): number => {
            return depts.reduce((total, dept) => {
                return total + 1 + calculateTotalCount(dept.childDepartments || []);
            }, 0);
        };

        // 최대 깊이 계산 (재귀적으로)
        const calculateMaxDepth = (depts: any[], currentDepth = 0): number => {
            if (depts.length === 0) return currentDepth;

            return Math.max(...depts.map((dept) => calculateMaxDepth(dept.childDepartments || [], currentDepth + 1)));
        };

        const totalCount = calculateTotalCount(hierarchy);
        const maxDepth = calculateMaxDepth(hierarchy);

        return {
            departments: hierarchy,
            totalCount: totalCount,
            rootCount: hierarchy.length,
            maxDepth: maxDepth,
        };
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
