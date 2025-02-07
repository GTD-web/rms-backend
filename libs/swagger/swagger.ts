import { INestApplication, Type } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, extraModels: Type<any>[]): void {
    const options = new DocumentBuilder()
        .setTitle('Resource API')
        .setDescription('Resource API description')
        .setVersion('1.0')
        .addTag('resource')
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        extraModels: extraModels,
    });

    SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/api-docs-json',
    });
}
