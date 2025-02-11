import { Injectable } from '@nestjs/common';
import { IEmployeeService } from '../../domain/interfaces/employee.interface';
import { IDepartmentService } from '../../domain/interfaces/department.interface';
import { IOrganizationClient } from '../../domain/interfaces/organization-client.interface';

@Injectable()
export class OrganizationService implements IEmployeeService, IDepartmentService {
    constructor(private readonly organizationClient: IOrganizationClient) {}

    async findById(id: string) {
        return this.organizationClient.getEmployee(id);
    }

    async findByDepartment(departmentId: string) {
        return this.organizationClient.getEmployeesByDepartment(departmentId);
    }

    async findChildren(parentId: string) {
        return this.organizationClient.getDepartmentChildren(parentId);
    }
}
