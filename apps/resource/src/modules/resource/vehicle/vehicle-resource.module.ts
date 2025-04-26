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
import { ConsumableUsecase } from './application/usecases/consumable.usecase';
import { MaintenanceUsecase } from './application/usecases/maintenance.usecase';
import { AdminVehicleInfoController } from './infrastructure/adapters/in/web/controllers/v1/admin.vehicle-info.controller';
import { AdminConsumableController } from './infrastructure/adapters/in/web/controllers/v1/admin.consumable.controller';
import { AdminMaintenanceController } from './infrastructure/adapters/in/web/controllers/v1/admin.maintenance.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleInfo, Consumable, Maintenance])],
    providers: [
        VehicleResourceHandler,
        VehicleInfoService,
        ConsumableService,
        MaintenanceService,
        VehicleInfoUsecase,
        ConsumableUsecase,
        MaintenanceUsecase,
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
    controllers: [VehicleInfoController, ConsumableController, MaintenanceController, AdminVehicleInfoController, AdminConsumableController, AdminMaintenanceController],
    exports: [
        VehicleResourceHandler,
        VehicleInfoService,
        ConsumableService,
        MaintenanceService,
        VehicleInfoUsecase,
        ConsumableUsecase,
        MaintenanceUsecase,
    ],
})
export class VehicleResourceModule {}
