import { NestFactory } from '@nestjs/core';
import { AppModule } from '@resource/app.module';
import { setupSwagger } from '@libs/swagger/swagger';
import { ENV } from '@libs/configs/env.config';
import * as businessDtos from './business.dto.index';
import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from '@libs/guards/role.guard';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
// RequestInterceptor는 AppModule에서 APP_INTERCEPTOR로 등록됨
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const isProduction = process.env.NODE_ENV === 'production';
    app.enableCors({
        origin: isProduction
            ? function (origin, callback) {
                  const whitelist = [
                      'https://portal.lumir.space',
                      'https://lsms.lumir.space',
                      'https://lrms.lumir.space',
                      'https://rms-backend-iota.vercel.app',
                      'https://lrms-dev.lumir.space',
                      'http://localhost:3002',
                  ];
                  if (!isProduction || !origin || whitelist.includes(origin)) {
                      callback(null, true);
                  } else {
                      callback(new Error('Not allowed by CORS'));
                  }
              }
            : true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)), new RolesGuard(app.get(Reflector)));
    // 전역 인터셉터는 AppModule에서 APP_INTERCEPTOR로 등록됨
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // 파일 업로드 설정
    const uploadPath = join(__dirname, '..', 'public');
    console.log('STATIC_ROOT=', uploadPath, 'files=', fs.existsSync(uploadPath) ? fs.readdirSync(uploadPath) : 'N/A');

    app.useStaticAssets(uploadPath, {
        prefix: '/static',
    });

    setupSwagger(app, [...Object.values(businessDtos)]);
    await app.listen(ENV.APP_PORT || 3000);
}
bootstrap();
