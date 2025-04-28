import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseResponseDto } from '../dtos/response.dto';
import { PaginationData } from '../dtos/paginate-response.dto';
import { UserDomainModule } from '@resource/modules/auth/user.domain.module';
import { EmployeeDomainModule } from '@resource/modules/employee/employee.domain.module';
import { NotificationDomainModule } from '@resource/modules/notification/notification.domain.module';
import { AuthModule } from '@resource/modules/auth/auth.module';
import { EmployeeModule } from '@resource/modules/employee/employee.module';
import { ResourceModule } from '@resource/modules/resource/resource.module';
import { ReservationModule } from '@resource/modules/reservation/reservation.module';
import { NotificationModule } from '@resource/modules/notification/notification.module';
import { FileModule } from '@resource/modules/file/file.module';

export function setupSwagger(app: INestApplication, dtos: any[]) {
    const config = new DocumentBuilder()
        .setTitle('Resource Management API')
        .setDescription('Resource Management API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        include: [AuthModule, EmployeeModule, ResourceModule, ReservationModule, NotificationModule, FileModule],
        extraModels: [BaseResponseDto, PaginationData, ...dtos],
    });

    const domainConfig = new DocumentBuilder()
        .setTitle('Domain API')
        .setDescription('Domain API Description')
        .setVersion('1.0')
        .build();

    const domainDocument = SwaggerModule.createDocument(app, domainConfig, {
        include: [UserDomainModule, EmployeeDomainModule, NotificationDomainModule],
    });

    SwaggerModule.setup('domain-api-docs', app, domainDocument, {
        jsonDocumentUrl: '/domain-api-docs-json',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        ],
    });

    SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/api-docs-json',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        ],

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
