import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IOrganizationClient } from '../../domain/interfaces/organization-client.interface';
import { IEmployee } from '../../domain/interfaces/employee.interface';
import { IDepartment } from '../../domain/interfaces/department.interface';

@Injectable()
export class OrganizationHttpAdapter implements IOrganizationClient {
    constructor(private readonly httpService: HttpService) {}

    async getEmployee(id: string): Promise<IEmployee> {
        // HTTP 클라이언트로 외부 서비스 호출 구현
        return {} as IEmployee;
    }

    async getEmployeesByDepartment(departmentId: string): Promise<IEmployee[]> {
        // HTTP 클라이언트로 외부 서비스 호출 구현
        return [];
    }

    async getDepartment(id: string): Promise<IDepartment> {
        // HTTP 클라이언트로 외부 서비스 호출 구현
        return {} as IDepartment;
    }

    async getDepartmentChildren(parentId: string): Promise<IDepartment[]> {
        // HTTP 클라이언트로 외부 서비스 호출 구현
        return [];
    }
}
