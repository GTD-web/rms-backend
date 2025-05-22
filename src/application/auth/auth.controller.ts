import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { AuthService } from '@resource/application/auth/auth.service';
import { Public } from '@libs/decorators/public.decorator';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { LoginResponseDto } from '@resource/modules/auth/application/dto/login-response.dto';

@ApiTags('1. 인증 - 사용자 페이지')
@Controller('v1/auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: '로그인' })
    @ApiDataResponse({ status: 201, description: '로그인 성공', type: LoginResponseDto })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
