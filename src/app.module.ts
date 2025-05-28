// node_modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

// 프로젝트 내부 라이브러리
import { typeOrmConfig } from '@libs/configs/typeorm.config';
import databaseConfig, { JWT_CONFIG } from '@libs/configs/env.config';
import { jwtConfig } from '@libs/configs/jwt.config';
import { Entities } from '@libs/entities';

// 프로젝트 내부 모듈
import { ReservationModule } from './modules/reservation/reservation.module';
import { AppService } from './app.service';

import { AppController } from './app.controller';
import { ApiDocService } from '@libs/utils/api-doc.service';
import { DbDocService } from '@libs/utils/db-doc.service';
import { SeedModule } from './modules/seed/seed.module';
import { TaskModule } from './modules/task/task.module';

import { AuthModule as AuthApplicationModule } from './application/auth/auth.module';
import { EmployeeModule as EmployeeApplicationModule } from './application/employee/employee.module';
import { FileModule as FileApplicationModule } from './application/file/file.module';
import { NotificationModule as NotificationApplicationModule } from './application/notification/notification.module';
import { ResourceCoreModule } from './application/resource/core/core.module';
import { VehicleResourceModule } from './modules/resource/vehicle/vehicle-resource.module';
import { ReservationSnapshotModule } from './application/reservation/snapshot/snapshot.module';
import { ReservationCoreModule } from './application/reservation/core/core.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, JWT_CONFIG],
        }),
        EventEmitterModule.forRoot(),
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

        SeedModule,
        TaskModule,

        AuthApplicationModule,
        EmployeeApplicationModule,
        FileApplicationModule,
        NotificationApplicationModule,
        ResourceCoreModule,
        VehicleResourceModule,
        ReservationSnapshotModule,
        ReservationCoreModule,
    ],
    controllers: [AppController],
    providers: [AppService, ApiDocService, DbDocService],
})
export class AppModule {}
