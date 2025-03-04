import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { UserUsecase } from '@resource/modules/auth/application/usecases/user.usecase';
import { UserResponseDto } from '@resource/modules/auth/application/dto/user-response.dto';
import { CheckPasswordDto } from '@resource/modules/auth/application/dto/check-password.dto';
import { ChangePasswordDto } from '@resource/modules/auth/application/dto/change-password.dto';

@ApiTags('유저')
@Controller('users')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userUsecase: UserUsecase) {}

    @ApiTags('sprint0.2')
    @Get('me')
    @ApiOperation({ summary: '내 상세 정보 조회' })
    @ApiDataResponse({ status: 200, description: '내 상세 정보 조회 성공', type: UserResponseDto })
    findUser(@User() user: UserEntity) {
        return this.userUsecase.findByUserId(user.userId);
    }

    @ApiTags('sprint0.2')
    @Post('check-password')
    @ApiOperation({ summary: '비밀번호 확인' })
    @ApiDataResponse({ status: 200, description: '비밀번호 확인 성공' })
    checkPassword(@User() user: UserEntity, @Body() checkPasswordDto: CheckPasswordDto) {
        return this.userUsecase.checkPassword(user.userId, checkPasswordDto.password);
    }

    @ApiTags('sprint0.2')
    @Post('change-password')
    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiDataResponse({ status: 200, description: '비밀번호 변경 성공' })
    changePassword(@User() user: UserEntity, @Body() changePasswordDto: ChangePasswordDto) {
        return this.userUsecase.changePassword(user.userId, changePasswordDto.newPassword);
    }
}
