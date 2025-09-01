import { Module } from '@nestjs/common';

// Context Modules
import { ResourceContextModule } from '@src/context/resource/resource.context.module';
import { ReservationContextModule } from '@src/context/reservation/reservation.context.module';
import { FileContextModule } from '@src/context/file/file.context.module';
import { NotificationContextModule } from '@src/context/notification/notification.context.module';

// Controllers
import { ResourceController } from './controllers/resource/resource.controller';
import { ResourceGroupController } from './controllers/resource/resource-group.controller';
import { VehicleInfoController } from './controllers/vehicle/vehicle-info.controller';
import { ConsumableController } from './controllers/vehicle/consumable.controller';
import { MaintenanceController } from './controllers/vehicle/maintenance.controller';
import { ReservationVehicleController } from './controllers/vehicle/reservation-vehicle.controller';

// Services
import { ResourceService } from './services/resource.service';
import { ResourceGroupService } from './services/resource-group.service';
import { VehicleInfoService } from './services/vehicle-info.service';
import { ConsumableService } from './services/consumable.service';
import { MaintenanceService } from './services/maintenance.service';

@Module({
    imports: [ResourceContextModule, ReservationContextModule, FileContextModule, NotificationContextModule],
    controllers: [
        ResourceController,
        ResourceGroupController,
        VehicleInfoController,
        ConsumableController,
        MaintenanceController,
        ReservationVehicleController,
    ],
    providers: [ResourceService, ResourceGroupService, VehicleInfoService, ConsumableService, MaintenanceService],
    exports: [ResourceService, ResourceGroupService, VehicleInfoService, ConsumableService, MaintenanceService],
})
export class ResourceManagementModule {}
