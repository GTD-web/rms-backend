// node_modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

// 프로젝트 내부 라이브러리
import { typeOrmConfig } from '@libs/configs/typeorm.config';
import databaseConfig, { JWT_CONFIG } from '@libs/configs/env.config';
import { jwtConfig } from '@libs/configs/jwt.config';
import { Entities } from '@libs/entities';

// 프로젝트 내부 모듈
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from '../../../libs/guards/jwt-auth.guard';
import { ResourceModule } from './modules/resource/resource.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AppService } from './app.service';
import { NotificationModule } from './modules/notification/notification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './modules/file/file.module';
import { AppController } from './app.controller';
import { ApiDocService } from '@libs/utils/api-doc.service';
import { DbDocService } from '@libs/utils/db-doc.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, JWT_CONFIG],
        }),
        JwtModule.registerAsync({
            global: true,
            useFactory: jwtConfig,
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        TypeOrmModule.forFeature(Entities),
        AuthModule,
        EmployeeModule,
        ResourceModule,
        ReservationModule,
        NotificationModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [AppService, ApiDocService, DbDocService],
})
export class AppModule {}
