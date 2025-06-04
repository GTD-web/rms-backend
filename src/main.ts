import { NestFactory } from '@nestjs/core';
import { AppModule } from '@resource/app.module';
import { setupSwagger } from '@libs/swagger/swagger';
import { ENV } from '@libs/configs/env.config';
import * as dtos from '@resource/dtos.index';
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';
import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from '@libs/guards/role.guard';
import { ValidationPipe } from '@nestjs/common';
import { RequestInterceptor } from '@libs/interceptors/request.interceptor';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const isProduction = process.env.NODE_ENV === 'production';
    app.enableCors({
        origin: isProduction
            ? function (origin, callback) {
                  console.log('isProduction :', isProduction);
                  console.log('origin :', origin);
                  const whitelist = [
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
    // 전역 인터셉터 등록
    app.useGlobalInterceptors(new RequestInterceptor(), new ResponseInterceptor(), new ErrorInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // 파일 업로드 설정
    const uploadPath = join(process.cwd(), 'public');
    app.useStaticAssets(uploadPath, {
        prefix: '/public',
        index: false,
        fallthrough: false,
    });

    setupSwagger(app, Object.values(dtos));
    await app.listen(ENV.APP_PORT || 3000);
}
bootstrap();
