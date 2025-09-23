import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { RolesGuard } from '@libs/guards/role.guard';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { EmployeeManagementService } from '../employee-management.service';
import { DepartmentListResponseDto, DepartmentHierarchyResponseDto } from '../dtos/department-response.dto';

@ApiTags('v2 부서   ')
@ApiBearerAuth()
@Controller('v2/departments')
export class DepartmentController {
    constructor(private readonly employeeManagementService: EmployeeManagementService) {}

    @Get('')
    @ApiOperation({ summary: '전체 부서 목록 조회' })
    @ApiDataResponse({
        status: 200,
        description: '전체 부서 목록을 성공적으로 조회했습니다.',
        type: DepartmentListResponseDto,
    })
    async findAllDepartments(): Promise<DepartmentListResponseDto> {
        return this.employeeManagementService.findAllDepartments();
    }

    @Get('sub-departments')
    @ApiOperation({ summary: '하위 부서 목록 조회 (부모 부서가 있는 부서들)' })
    @ApiDataResponse({
        status: 200,
        description: '하위 부서 목록을 성공적으로 조회했습니다.',
        type: DepartmentListResponseDto,
    })
    async findSubDepartments(): Promise<DepartmentListResponseDto> {
        return this.employeeManagementService.findSubDepartments();
    }

    @Get('root-departments')
    @ApiOperation({ summary: '루트 부서 목록 조회 (최상위 부서들)' })
    @ApiDataResponse({
        status: 200,
        description: '루트 부서 목록을 성공적으로 조회했습니다.',
        type: DepartmentListResponseDto,
    })
    async findRootDepartments(): Promise<DepartmentListResponseDto> {
        return this.employeeManagementService.findRootDepartments();
    }

    @Get('hierarchy')
    @ApiOperation({ summary: '부서 계층구조 조회' })
    @ApiDataResponse({
        status: 200,
        description: '부서 계층구조를 성공적으로 조회했습니다.',
        type: DepartmentHierarchyResponseDto,
    })
    async findDepartmentHierarchy(): Promise<DepartmentHierarchyResponseDto> {
        return this.employeeManagementService.findDepartmentHierarchy();
    }
}
