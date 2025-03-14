import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleInfo, Consumable, Maintenance } from '@libs/entities';
import { VehicleResourceHandler } from './application/handlers/vehicle-resource.handler';
import { VehicleInfoService } from './application/services/vehicle-info.service';
import { ConsumableService } from './application/services/consumable.service';
import { MaintenanceService } from './application/services/maintenance.service';
import { ConsumableController } from './infrastructure/adapters/in/web/controllers/consumable.controller';
import { MaintenanceController } from './infrastructure/adapters/in/web/controllers/maintenance.controller';
import { VehicleInfoRepository } from './infrastructure/adapters/out/persistence/vehicle-info.repository';
import { ConsumableRepository } from './infrastructure/adapters/out/persistence/consumable.repository';
import { MaintenanceRepository } from './infrastructure/adapters/out/persistence/maintenance.repository';
import { VehicleInfoController } from './infrastructure/adapters/in/web/controllers/vehicle-info.controller';
import { VehicleInfoUsecase } from './application/usecases/vehicle-info.usecase';
import { NotificationModule } from '@resource/modules/notification/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleInfo, Consumable, Maintenance]), NotificationModule],
    providers: [
        VehicleResourceHandler,
        VehicleInfoService,
        ConsumableService,
        MaintenanceService,
        VehicleInfoUsecase,
        VehicleInfoRepository,
        {
            provide: 'VehicleInfoRepositoryPort',
            useExisting: VehicleInfoRepository,
        },
        ConsumableRepository,
        {
            provide: 'ConsumableRepositoryPort',
            useExisting: ConsumableRepository,
        },
        MaintenanceRepository,
        {
            provide: 'MaintenanceRepositoryPort',
            useExisting: MaintenanceRepository,
        },
    ],
    controllers: [VehicleInfoController, ConsumableController, MaintenanceController],
    exports: [VehicleResourceHandler, VehicleInfoService, ConsumableService, MaintenanceService, VehicleInfoUsecase],
})
export class VehicleResourceModule {}
