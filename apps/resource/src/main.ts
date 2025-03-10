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
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from '@libs/guards/role.guard';
import { RequestInterceptor } from '@libs/interceptors/request.interceptor';
import * as express from 'express';
import { Express } from 'express';

const server: Express = express();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)), new RolesGuard(app.get(Reflector)));
    // 전역 인터셉터 등록
    app.useGlobalInterceptors(new RequestInterceptor(), new ResponseInterceptor(), new ErrorInterceptor());
    // 파일 업로드 설정
    const uploadPath = join(process.cwd(), 'uploads');
    app.useStaticAssets(uploadPath, {
        prefix: '/uploads',
        index: false,
        fallthrough: false,
    });

    setupSwagger(app, Object.values(dtos));
    await app.listen(ENV.APP_PORT || 3000);
}
bootstrap();

export default server; // ✅ Vercel에서 실행될 핸들러 추가
