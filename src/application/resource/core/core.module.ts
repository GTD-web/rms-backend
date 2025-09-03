import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Resource,
    ResourceGroup,
    ResourceManager,
    VehicleInfo,
    MeetingRoomInfo,
    AccommodationInfo,
    File,
    Reservation,
    Consumable,
    Maintenance,
    EquipmentInfo,
} from '@libs/entities';
import { DomainAccommodationInfoModule } from '@src/domain/accommodation-info/accommodation-info.module';
import { DomainMeetingRoomInfoModule } from '@src/domain/meeting-room-info/meeting-room-info.module';
import { DomainResourceGroupModule } from '@src/domain/resource-group/resource-group.module';
import { DomainResourceManagerModule } from '@src/domain/resource-manager/resource-manager.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { DomainEquipmentInfoModule } from '@src/domain/equipment-info/equipment-info.module';
import { DomainFileModule } from '@src/domain/file/file.module';
import { DomainFileResourceModule } from '@src/domain/file-resource/file-resource.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainConsumableModule } from '@src/domain/consumable/consumable.module';
import { DomainMaintenanceModule } from '@src/domain/maintenance/maintenance.module';

import { UserResourceGroupController } from './controllers/resource-group.controller';
import { UserResourceController } from './controllers/resource.controller';
import { AdminResourceController } from './controllers/admin.resource.controller';
import { AdminResourceGroupController } from './controllers/admin.resource-group.controller';
import { ResourceService } from './services/resource.service';
import { ResourceGroupService } from './services/resource-group.service';

import * as ResourceUsecase from './usecases/resource';
import * as ResourceGroupUsecase from './usecases/resource-group';
import { DomainFileVehicleInfoModule } from '@src/domain/file-vehicle-info/file-vehicle-info.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Resource,
            ResourceGroup,
            ResourceManager,
            VehicleInfo,
            Consumable,
            Maintenance,
            MeetingRoomInfo,
            AccommodationInfo,
            EquipmentInfo,
            File,
            Reservation,
        ]),
        DomainResourceModule,
        DomainResourceGroupModule,
        DomainResourceManagerModule,
        DomainVehicleInfoModule,
        DomainConsumableModule,
        DomainMaintenanceModule,
        DomainMeetingRoomInfoModule,
        DomainAccommodationInfoModule,
        DomainEquipmentInfoModule,
        DomainFileModule,
        DomainFileResourceModule,
        DomainFileVehicleInfoModule,
        DomainReservationModule,
    ],
    controllers: [
        AdminResourceController,
        AdminResourceGroupController,
        UserResourceGroupController,
        UserResourceController,
    ],
    providers: [
        ResourceService,
        ResourceGroupService,
        ...Object.values(ResourceUsecase),
        ...Object.values(ResourceGroupUsecase),
    ],
})
export class ResourceCoreModule {}
