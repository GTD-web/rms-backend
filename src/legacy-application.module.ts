import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

// 인터셉터 import
import { ResponseInterceptor } from '@libs/interceptors/response.interceptor';
import { ErrorInterceptor } from '@libs/interceptors/error.interceptor';

// 레거시 application 모듈들
import { AuthModule as AuthApplicationModule } from './application/auth/auth.module';
import { EmployeeModule as EmployeeApplicationModule } from './application/employee/employee.module';
import { FileModule as FileApplicationModule } from './application/file/file.module';
import { NotificationModule as NotificationApplicationModule } from './application/notification/notification.module';
import { ResourceCoreModule } from './application/resource/core/core.module';
import { ReservationSnapshotModule } from './application/reservation/snapshot/snapshot.module';
import { ReservationCoreModule } from './application/reservation/core/core.module';
import { VehicleResourceModule } from './application/resource/vehicle/vehicle.module';
import { TaskModule } from './application/task/task.module';
import { StatisticsModule } from './application/statistics/statistics.module';

@Module({
    imports: [
        // 레거시 application 모듈들
        AuthApplicationModule,
        EmployeeApplicationModule,
        // FileApplicationModule,
        NotificationApplicationModule,
        // ResourceCoreModule,
        // ReservationSnapshotModule,
        // ReservationCoreModule,
        // VehicleResourceModule,
        // TaskModule,
        // StatisticsModule,
    ],
    providers: [],
})
export class LegacyApplicationModule {}
