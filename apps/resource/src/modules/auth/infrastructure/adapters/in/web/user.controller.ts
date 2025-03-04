import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { AuthService } from '@resource/modules/auth/domain/ports/auth.service.port';
import { Public } from '@libs/decorators/public.decorator';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';

@ApiTags('유저')
@Controller('users')
@ApiBearerAuth()
export class UserController {
    constructor(@Inject('AuthService') private authService: AuthService) {}

    @Post('check-password')
    @ApiOperation({ summary: '비밀번호 확인' })
    checkPassword() {
        return;
    }

    @Post('change-password')
    @ApiOperation({ summary: '비밀번호 변경 (미완성)' })
    // @ApiDataResponse({ status: 200, description: '비밀번호 변경 성공', type: ChangePasswordDto })
    changePassword() {
        return;
    }
}
