import { Module } from '@nestjs/common';

// 인터셉터 import

// 레거시 application 모듈들
import { AuthModule as AuthApplicationModule } from './application/auth/auth.module';
import { EmployeeModule as EmployeeApplicationModule } from './application/employee/employee.module';
import { FileModule as FileApplicationModule } from './application/file/file.module';
import { NotificationModule as NotificationApplicationModule } from './application/notification/notification.module';
import { ResourceCoreModule as ResourceApplicationModule } from './application/resource/core/core.module';
import { ReservationCoreModule as ReservationApplicationModule } from './application/reservation/core/core.module';
import { VehicleResourceModule as VehicleResourceModule } from './application/resource/vehicle/vehicle.module';
import { TaskModule as TaskApplicationModule } from './application/task/task.module';
import { StatisticsModule as StatisticsApplicationModule } from './application/statistics/statistics.module';

@Module({
    imports: [
        // 레거시 application 모듈들
        AuthApplicationModule,
        EmployeeApplicationModule,
        FileApplicationModule,
        NotificationApplicationModule,
        ResourceApplicationModule,
        ReservationApplicationModule,
        ReservationApplicationModule,
        VehicleResourceModule,
        TaskApplicationModule,
        StatisticsApplicationModule,
    ],
    providers: [],
})
export class LegacyApplicationModule {}
