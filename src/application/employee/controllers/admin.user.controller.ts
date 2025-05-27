import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { ChangeRoleDto } from '@resource/application/employee/dtos/change-role.dto';
import { EmployeeService } from '../employee.service';

@ApiTags('5. 유저 - 관리자 페이지')
@ApiBearerAuth()
@Controller('v1/admin/users')
@Roles(Role.SYSTEM_ADMIN)
export class AdminUserController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('')
    @ApiOperation({ summary: '직원 목록 조회	자원담당자로 설정하기 위한 직원 목록' })
    @ApiDataResponse({ status: 200, description: '내 상세 정보 조회 성공', type: UserResponseDto })
    findUser() {
        return this.employeeService.findManagerCandidates();
    }

    @Patch('change/role')
    @ApiOperation({ summary: '자원 담당자 설정	자원별 담당자 설정 또는 토글 방식' })
    @ApiDataResponse({ status: 200, description: '자원 담당자 설정 성공' })
    changeRole(@Body() changeRoleDto: ChangeRoleDto) {
        return this.employeeService.changeRole(changeRoleDto);
    }
}
