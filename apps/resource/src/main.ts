import { NestFactory } from '@nestjs/core';
import { AppModule } from '@resource/app.module';
import { setupSwagger } from '@libs/swagger/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    setupSwagger(app, []);
    await app.listen(5001);
}
bootstrap();
