import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '@resource/application/auth/dto/login.dto';
import { AuthService } from '@resource/application/auth/auth.service';
import { Public } from '@libs/decorators/public.decorator';
import { ApiDataResponse } from '@libs/decorators/api-responses.decorator';
import { LoginResponseDto } from '@resource/application/auth/dto/login-response.dto';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

@ApiTags('1. 인증 ')
@Controller('v1/auth')
@UseInterceptors(ResponseInterceptor, ErrorInterceptor)
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
