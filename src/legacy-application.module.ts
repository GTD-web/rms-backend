import { Module } from '@nestjs/common';

// 인터셉터 import

// 레거시 application 모듈들
import { AuthModule as AuthApplicationModule } from './application/auth/auth.module';
import { EmployeeModule as EmployeeApplicationModule } from './application/employee/employee.module';

@Module({
    imports: [
        // 레거시 application 모듈들
        AuthApplicationModule,
        EmployeeApplicationModule,
        // FileApplicationModule,
        // NotificationApplicationModule,
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
