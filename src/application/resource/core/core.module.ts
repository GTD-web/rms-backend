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
} from '@libs/entities';
import { DomainAccommodationInfoModule } from '@src/domain/accommodation-info/accommodation-info.module';
import { DomainMeetingRoomInfoModule } from '@src/domain/meeting-room-info/meeting-room-info.module';
import { DomainResourceGroupModule } from '@src/domain/resource-group/resource-group.module';
import { DomainResourceManagerModule } from '@src/domain/resource-manager/resource-manager.module';
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';
import { DomainFileModule } from '@src/domain/file/file.module';
import { DomainReservationModule } from '@src/domain/reservation/reservation.module';
import { DomainConsumableModule } from '@src/domain/consumable/consumable.module';
import { DomainMaintenanceModule } from '@src/domain/maintenance/maintenance.module';

import { UserResourceGroupController } from './controllers/resource-group.controller';
import { UserResourceController } from './controllers/resource.controller';
import { AdminResourceController } from './controllers/admin.resource.controller';
import { AdminResourceGroupController } from './controllers/admin.resource-group.controller';
import { ResourceService } from './services/resource.service';
import { ResourceGroupService } from './services/resource-group.service';

import {
    FindResourcesUsecase,
    FindResourceDetailUsecase,
    CheckAvailabilityUsecase,
    CreateResourceWithInfosUsecase,
    UpdateResourceUsecase,
    ReorderResourcesUsecase,
    DeleteResourceUsecase,
    FindAvailableTimeUsecase,
    FindResourcesByTypeAndDateWithReservationsUsecase,
} from './usecases/resource';

import {
    FindParentResourceGroupsUsecase,
    FindResourceGroupsWithResourceDataUsecase,
    CreateResourceGroupUsecase,
    UpdateResourceGroupUsecase,
    ReorderResourceGroupsUsecase,
    DeleteResourceGroupUsecase,
} from './usecases/resource-group';

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
        DomainFileModule,
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
        FindResourcesUsecase,
        FindResourceDetailUsecase,
        CheckAvailabilityUsecase,
        CreateResourceWithInfosUsecase,
        UpdateResourceUsecase,
        ReorderResourcesUsecase,
        DeleteResourceUsecase,
        FindAvailableTimeUsecase,
        FindResourcesByTypeAndDateWithReservationsUsecase,
        FindParentResourceGroupsUsecase,
        FindResourceGroupsWithResourceDataUsecase,
        CreateResourceGroupUsecase,
        UpdateResourceGroupUsecase,
        ReorderResourceGroupsUsecase,
        DeleteResourceGroupUsecase,
    ],
})
export class ResourceCoreModule {}
