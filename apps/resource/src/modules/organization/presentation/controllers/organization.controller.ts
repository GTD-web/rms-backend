import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from '../../application/services/organization.service';

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get('employees/:id')
    async getEmployee(@Param('id') id: string) {
        return this.organizationService.findById(id);
    }

    @Get('departments/:id/employees')
    async getDepartmentEmployees(@Param('id') departmentId: string) {
        return this.organizationService.findByDepartment(departmentId);
    }
}
