import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleInfo, Consumable, Maintenance, Employee, Notification, File } from '@libs/entities';
import { AdminVehicleInfoController } from './controllers/admin.vehicle-info.controller';
import { AdminConsumableController } from './controllers/admin.consumable.controller';
import { AdminMaintenanceController } from './controllers/admin.maintenance.controller';
import { UserConsumableController } from './controllers/consumable.controller';
import { UserMaintenanceController } from './controllers/maintenance.controller';
import { DomainConsumableModule } from '@src/domain/consumable/consumable.module';
import { DomainMaintenanceModule } from '@src/domain/maintenance/maintenance.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { NotificationModule } from '@src/application/notification/notification.module';
import { VehicleInfoService } from './services/vehicle-info.service';
import { ConsumableService } from './services/consumable.service';
import { MaintenanceService } from './services/maintenance.service';

// Usecases
import { FindVehicleInfoUsecase, UpdateVehicleInfoUsecase } from './usecases/vehicle-info';
import {
    SaveConsumableUsecase,
    UpdateConsumableUsecase,
    DeleteConsumableUsecase,
    FindAllConsumablesUsecase,
    FindOneConsumableUsecase,
} from './usecases/consumable';
import {
    SaveMaintenanceUsecase,
    UpdateMaintenanceUsecase,
    DeleteMaintenanceUsecase,
    FindAllMaintenancesUsecase,
    FindOneMaintenanceUsecase,
    FindAllMaintenancesByVehicleInfoIdUsecase,
} from './usecases/maintenance';
import { DomainFileModule } from '@src/domain/file/file.module';
import { ResourceContextModule } from '@src/context/resource/resource.context.module';
import { FileContextModule } from '@src/context/file/file.context.module';
import { AdminReservationVehicleController } from './controllers/admin.reservation-vehicle.controller';
@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleInfo, Consumable, Maintenance, Employee, Notification, File]),
        DomainVehicleInfoModule,
        DomainConsumableModule,
        DomainMaintenanceModule,
        DomainEmployeeModule,
        NotificationModule,
        DomainFileModule,
        ResourceContextModule,
        FileContextModule,
    ],
    controllers: [
        AdminVehicleInfoController,
        AdminConsumableController,
        AdminMaintenanceController,
        UserConsumableController,
        UserMaintenanceController,
        AdminReservationVehicleController,
    ],
    providers: [
        VehicleInfoService,
        ConsumableService,
        MaintenanceService,
        // Vehicle Info Usecases
        FindVehicleInfoUsecase,
        UpdateVehicleInfoUsecase,
        // Consumable Usecases
        SaveConsumableUsecase,
        UpdateConsumableUsecase,
        DeleteConsumableUsecase,
        FindAllConsumablesUsecase,
        FindOneConsumableUsecase,
        // Maintenance Usecases
        SaveMaintenanceUsecase,
        UpdateMaintenanceUsecase,
        DeleteMaintenanceUsecase,
        FindAllMaintenancesUsecase,
        FindOneMaintenanceUsecase,
        FindAllMaintenancesByVehicleInfoIdUsecase,
    ],
    exports: [VehicleInfoService, ConsumableService, MaintenanceService],
})
export class VehicleResourceModule {}
