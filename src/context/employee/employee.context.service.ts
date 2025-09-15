import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { Role } from '@libs/enums/role-type.enum';
import { In, IsNull, Not, Raw } from 'typeorm';
import { EmployeeResponseDto } from '@src/business/employee-management/dtos/employee-response.dto';
import { EmplyeesByDepartmentResponseDto } from '@src/business/employee-management/dtos/employees-by-department-response.dto';
import { UserResponseDto } from '@src/business/employee-management/dtos/user-response.dto';
import { ChangeRoleDto } from '@src/business/employee-management/dtos/change-role.dto';
import { UpdateNotificationSettingsDto } from '@src/business/employee-management/dtos/notification-settings.dto';
import { MMSEmployeeResponseDto } from '@src/business/employee-management/dtos/mms-employee-response.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { Employee } from '@libs/entities/employee.entity';
import { EmployeeMicroserviceAdapter } from '@src/domain/employee/adapters/employee-microservice.adapter';

@Injectable()
export class EmployeeContextService {
    constructor(
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly employeeMicroserviceAdapter: EmployeeMicroserviceAdapter,
    ) {}

    async 시스템관리자_목록을_조회한다(): Promise<Employee[]> {
        const systemAdmins = await this.domainEmployeeService.findAll({
            where: {
                roles: Raw(() => `'${Role.SYSTEM_ADMIN}' = ANY("roles")`),
            },
        });
        return systemAdmins;
    }

    /**
     * 자원 관리자 목록을 부서별로 조회한다
     */
    async 자원관리자_목록을_조회한다(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const resourceManagers = await this.domainEmployeeService.findAll({
            where: {
                roles: Raw(() => `'${Role.RESOURCE_ADMIN}' = ANY("roles")`),
                department: Not(In(['관리자'])),
                status: Not(In(['퇴사'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
                status: true,
            },
        });

        return this.부서별로_그룹핑한다(resourceManagers);
    }

    /**
     * 관리자 후보 목록을 부서별로 조회한다
     */
    async 관리자_후보_목록을_조회한다(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const candidates = await this.domainEmployeeService.findAll({
            where: {
                department: Not(In(['관리자'])),
                status: Not(In(['퇴사'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
                roles: true,
            },
        });

        const candidatesWithRole = candidates.map((candidate) => ({
            ...candidate,
            isResourceAdmin: candidate.roles.includes(Role.RESOURCE_ADMIN),
        }));

        return this.부서별로_그룹핑한다(candidatesWithRole);
    }

    /**
     * 직원 목록을 부서별로 조회한다
     */
    async 직원_목록을_조회한다(): Promise<EmplyeesByDepartmentResponseDto[]> {
        const employees = await this.domainEmployeeService.findAll({
            where: {
                department: Not(In(['관리자'])),
                status: Not(In(['퇴사'])),
            },
            select: {
                employeeId: true,
                name: true,
                employeeNumber: true,
                department: true,
                position: true,
                status: true,
            },
        });

        return this.부서별로_그룹핑한다(employees);
    }

    /**
     * 직원 상세 정보를 조회한다
     */
    async 직원_상세정보를_조회한다(employeeId: string): Promise<UserResponseDto> {
        const employee = await this.domainEmployeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        return {
            employeeId: employee.employeeId,
            email: employee.email,
            mobile: employee.mobile,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            roles: employee.roles,
            isPushNotificationEnabled: employee.isPushNotificationEnabled,
        };
    }

    /**
     * 비밀번호를 확인한다
     */
    async 비밀번호를_확인한다(employeeId: string, password: string): Promise<boolean> {
        const employee = await this.domainEmployeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        try {
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(
                `${ssoApiUrl}/api/auth/check-password`,
                {
                    currentPassword: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${employee.accessToken}`,
                    },
                },
            );
            const data = response.data;
            return data.isValid;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }

    /**
     * 비밀번호를 변경한다
     */
    async 비밀번호를_변경한다(employeeId: string, password: string): Promise<void> {
        const employee = await this.domainEmployeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        try {
            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(
                `${ssoApiUrl}/api/auth/change-password`,
                {
                    newPassword: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${employee.accessToken}`,
                    },
                },
            );
            const data = response.data;
            console.log(data);
            employee.password = await bcrypt.hash(password, 10);
            await this.domainEmployeeService.update(employee.employeeId, employee);
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }

    /**
     * 직원의 역할을 변경한다
     */
    async 직원_역할을_변경한다(changeRoleDto: ChangeRoleDto): Promise<void> {
        const employee = await this.domainEmployeeService.findByEmployeeId(changeRoleDto.employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        employee.roles = changeRoleDto.isResourceAdmin
            ? [...employee.roles, Role.RESOURCE_ADMIN]
            : employee.roles.filter((role) => role !== Role.RESOURCE_ADMIN);

        await this.domainEmployeeService.update(employee.employeeId, employee);
    }

    /**
     * 알림 설정을 변경한다
     */
    async 알림설정을_변경한다(employeeId: string, updateDto: UpdateNotificationSettingsDto): Promise<UserResponseDto> {
        const employee = await this.domainEmployeeService.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.AUTH.USER_NOT_FOUND);
        }

        employee.isPushNotificationEnabled = updateDto.isPushNotificationEnabled;
        await this.domainEmployeeService.update(employee.employeeId, employee);

        return this.직원_상세정보를_조회한다(employeeId);
    }

    /**
     * 외부 시스템에서 직원 정보를 조회한다
     */
    async 직원_정보를_동기화한다(authorization: string): Promise<EmplyeesByDepartmentResponseDto[]> {
        const { employees, total } = await this.employeeMicroserviceAdapter.getAllEmployees(authorization);
        for (const employee of employees) {
            const existingEmployee = await this.domainEmployeeService.findByEmployeeNumber(employee.employeeNumber);
            console.log('update employee', employee);

            if (employee.status === '퇴사') {
                if (existingEmployee) {
                    await this.domainEmployeeService.update(existingEmployee.employeeId, {
                        department: employee.department.departmentCode,
                        position: employee.rank.rankName,
                        status: employee.status,
                    });
                }
                continue;
            }

            try {
                if (existingEmployee) {
                    existingEmployee.name = employee.name;
                    existingEmployee.employeeNumber = employee.employeeNumber;
                    existingEmployee.department = employee.department.departmentCode;
                    existingEmployee.position = employee.rank.rankName;
                    existingEmployee.mobile = employee.phoneNumber;
                    existingEmployee.status = employee.status;
                    await this.domainEmployeeService.save(existingEmployee);
                } else {
                    console.log('create employee', employee);
                    const employeeData = {
                        employeeNumber: employee.employeeNumber,
                        name: employee.name,
                        email: employee.email,
                        department: employee.department.departmentCode,
                        position: employee.rank.rankName,
                        mobile: employee.phoneNumber,
                        status: employee.status,
                    };
                    const newEmployee = await this.domainEmployeeService.create(employeeData);
                    await this.domainEmployeeService.save(newEmployee);
                }
            } catch (error) {
                console.log(error);
            }
        }
        return this.직원_목록을_조회한다();
    }

    async 구독정보를_동기화한다(): Promise<void> {
        const employees = await this.domainEmployeeService.findAll({
            where: {
                subscriptions: Not(IsNull()),
                department: Not(In(['관리자'])),
                status: Not(In(['퇴사'])),
            },
        });
        let count = 1;
        for (const employee of employees) {
            const response = await this.employeeMicroserviceAdapter.subscribeFcm('', employee.employeeNumber, {
                fcmToken: employee.subscriptions[0].fcm?.token,
            });
            if (response.success) {
                console.log('구독 정보 동기화 성공', count, employee.name, employee.employeeNumber);
                count++;
            }
        }
    }

    /**
     * 직원 목록을 부서별로 그룹핑한다 (데이터 가공만, 조회 안함)
     */
    private 부서별로_그룹핑한다(employees: any[]): EmplyeesByDepartmentResponseDto[] {
        const departments = new Map<string, EmployeeResponseDto[]>();

        employees.forEach((employee) => {
            if (!departments.has(employee.department)) {
                departments.set(employee.department, []);
            }
            departments.get(employee.department)?.push(employee);
        });

        return Array.from(departments.entries()).map(([department, employees]) => ({
            department,
            employees,
        }));
    }
}
