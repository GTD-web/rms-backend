import { NestFactory } from '@nestjs/core';
import { AppModule } from '@resource/app.module';
import { setupSwagger } from '@libs/swagger/swagger';
import { ENV } from '@libs/configs/env.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    setupSwagger(app, []);
    await app.listen(ENV.APP_PORT || 3000);
}
bootstrap();
