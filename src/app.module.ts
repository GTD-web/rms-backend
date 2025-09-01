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
// import { ApiDocService } from '@libs/utils/api-doc.service';
// import { DbDocService } from '@libs/utils/db-doc.service';
// import { SeedModule } from './modules/seed/seed.module';

import { LegacyApplicationModule } from './legacy-application.module';
import { FileContextModule } from './context/file/file.context.module';
import { ResourceManagementModule } from './business/resource-management/resource-management.module';
import { ReservationManagementModule } from './business/reservation-management/reservation-management.module';
import { ScheduleManagementModule } from './business/schedule-management/schedule-management.module';
import { EmployeeManagementModule } from './business/employee-management/employee-management.module';
import { TaskManagementModule } from './business/task-management/task-management.module';
import { NotificationManagementModule } from './business/notification-management/notification-management.module';
import { StatisticsModule } from './business/statistics/statistics.module';

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

        // SeedModule,

        /** 레거시 어플리케이션 (인터셉터 적용) */
        LegacyApplicationModule,

        /** 비즈니스 */
        FileContextModule,
        ResourceManagementModule,
        ReservationManagementModule,
        ScheduleManagementModule,
        EmployeeManagementModule,
        TaskManagementModule,
        NotificationManagementModule,
        StatisticsModule,
    ],
    providers: [
        // ApiDocService, DbDocService
    ],
})
export class AppModule {}
