import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { Roles } from '@libs/decorators/role.decorator';
import { Role } from '@libs/enums/role-type.enum';
import { UserResponseDto } from '@resource/application/employee/dtos/user-response.dto';
import { CheckPasswordDto } from '@resource/application/employee/dtos/check-password.dto';
import { ChangePasswordDto } from '@resource/application/employee/dtos/change-password.dto';
import { UpdateNotificationSettingsDto } from '@resource/application/employee/dtos/notification-settings.dto';
import { EmployeeService } from '../employee.service';

@ApiTags('5. 유저 - 사용자 페이지')
@Controller('v1/users')
@ApiBearerAuth()
@Roles(Role.USER)
export class UserUserController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('me')
    @ApiOperation({ summary: '내 상세 정보 조회' })
    @ApiDataResponse({ status: 200, description: '내 상세 정보 조회 성공', type: UserResponseDto })
    findUser(@User() user: UserEntity) {
        return this.employeeService.findEmployeeDetail(user.employeeId);
    }

    @Post('check-password')
    @ApiOperation({ summary: '비밀번호 확인' })
    @ApiDataResponse({ status: 200, description: '비밀번호 확인 성공' })
    checkPassword(@User() user: UserEntity, @Body() checkPasswordDto: CheckPasswordDto) {
        return this.employeeService.checkPassword(user.employeeId, checkPasswordDto.password);
    }

    @Post('change-password')
    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiDataResponse({ status: 200, description: '비밀번호 변경 성공' })
    changePassword(@User() user: UserEntity, @Body() changePasswordDto: ChangePasswordDto) {
        return this.employeeService.changePassword(user.employeeId, changePasswordDto.newPassword);
    }

    @Patch('me/notification-settings')
    @ApiOperation({ summary: '알림 설정' })
    @ApiDataResponse({
        status: 200,
        description: '알림 설정 성공',
        type: UserResponseDto,
    })
    async changeNotificationSettings(
        @User() user: UserEntity,
        @Body() updateDto: UpdateNotificationSettingsDto,
    ): Promise<UserResponseDto> {
        return this.employeeService.changeNotificationSettings(user.employeeId, updateDto);
    }
}
