import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseResponseDto, PaginatedResponseDto } from '@libs/decorators/api-responses.decorator';

export function setupSwagger(app: INestApplication, dtos: any[]) {
    const config = new DocumentBuilder()
        .setTitle('Resource Management API')
        .setDescription('Resource Management API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [BaseResponseDto, PaginatedResponseDto, ...dtos],
    });

    SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/api-docs-json',

        swaggerOptions: {
            tagsSorter: (a: string, b: string) => {
                const isAEnglish = /^[A-Za-z]/.test(a);
                const isBEnglish = /^[A-Za-z]/.test(b);

                if (isAEnglish && !isBEnglish) return -1; // 알파벳(A-Z) 먼저
                if (!isAEnglish && isBEnglish) return 1; // 한글(가-힣) 뒤로

                return a.localeCompare(b, 'en'); // 같은 언어일 경우 알파벳순 정렬
            },
            docExpansion: 'none',

            persistAuthorization: true,
        },
    });
}
