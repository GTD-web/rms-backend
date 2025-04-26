import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { User } from '@libs/decorators/user.decorator';
import { User as UserEntity } from '@libs/entities';
import { UserUsecase } from '@resource/modules/auth/application/usecases/user.usecase';
import { UserResponseDto } from '@resource/modules/auth/application/dto/user-response.dto';
import { CheckPasswordDto } from '@resource/modules/auth/application/dto/check-password.dto';
import { ChangePasswordDto } from '@resource/modules/auth/application/dto/change-password.dto';

@ApiTags('5. 유저 - 관리자 페이지')
@Controller('v1/admin/users')
@ApiBearerAuth()
export class AdminUserController {
    constructor(private readonly userUsecase: UserUsecase) {}
    // check api
    @Get('')
    @ApiOperation({ summary: '직원 목록 조회	자원담당자로 설정하기 위한 직원 목록' })
    @ApiDataResponse({ status: 200, description: '내 상세 정보 조회 성공', type: UserResponseDto })
    findUser(@User() user: UserEntity) {
        return null
    }
    // check api - url
    @Patch('change/role')
    @ApiOperation({ summary: '자원 담당자 설정	자원별 담당자 설정 또는 토글 방식' })
        @ApiDataResponse({ status: 200, description: '비밀번호 확인 성공' })
    changeRole(@User() user: UserEntity, @Body() checkPasswordDto: CheckPasswordDto) {
        return null
    }
  
}
