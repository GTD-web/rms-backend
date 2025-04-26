import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, Resource, ResourceGroup, ResourceManager, User } from '@libs/entities';
import { ResourceService } from './common/application/services/resource.service';
import { ResourceGroupService } from './common/application/services/resource-group.service';
import { ResourceManagerService } from './common/application/services/resource-manager.service';
import { ResourceController } from './common/infrastructure/adapters/in/web/controllers/resource.controller';
import { ResourceGroupController } from './common/infrastructure/adapters/in/web/controllers/resource-group.controller';
import { ResourceRepository } from './common/infrastructure/adapters/out/persistence/resource.repository';
import { ResourceGroupRepository } from './common/infrastructure/adapters/out/persistence/resource-group.repository';
import { ResourceManagerRepository } from './common/infrastructure/adapters/out/persistence/resource-manager.repository';
import { VehicleResourceModule } from './vehicle/vehicle-resource.module';
import { MeetingRoomResourceModule } from './meeting-room/meeting-room-resource.module';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { VehicleResourceHandler } from './vehicle/application/handlers/vehicle-resource.handler';
import { MeetingRoomResourceHandler } from './meeting-room/application/handlers/meeting-room-resource.handler';
import { AccommodationResourceModule } from './accommodation/accommodation-resource.module';
import { AccommodationResourceHandler } from './accommodation/application/handlers/accommodation-resource.handler';
import { ResourceGroupUsecase } from './common/application/usecases/resource-group.usecase';
import { ResourceUsecase } from './common/application/usecases/resource.usecase';
import { FileModule } from '../file/file.module';
import { AdminResourceController } from './common/infrastructure/adapters/in/web/controllers/v1/admin.resource.controller';
import { AdminResourceGroupController } from './common/infrastructure/adapters/in/web/controllers/v1/admin.resource-group.controller';
import { UserResourceGroupController } from './common/infrastructure/adapters/in/web/controllers/v1/resource-group.controller';
import { UserResourceController } from './common/infrastructure/adapters/in/web/controllers/v1/resource.controller';
@Module({
    imports: [
        TypeOrmModule.forFeature([Resource, ResourceGroup, ResourceManager]),
        VehicleResourceModule,
        MeetingRoomResourceModule,
        AccommodationResourceModule,
        FileModule,
    ],
    providers: [
        ResourceService,
        ResourceGroupService,
        ResourceManagerService,
        {
            provide: 'ResourceRepositoryPort',
            useClass: ResourceRepository,
        },
        {
            provide: 'ResourceGroupRepositoryPort',
            useClass: ResourceGroupRepository,
        },
        {
            provide: 'ResourceManagerRepositoryPort',
            useClass: ResourceManagerRepository,
        },
        {
            provide: 'ResourceTypeHandlers',
            useFactory: (
                vehicleHandler: VehicleResourceHandler,
                meetingRoomHandler: MeetingRoomResourceHandler,
                accommodationHandler: AccommodationResourceHandler,
            ) => {
                const handlers = new Map();
                handlers.set(ResourceType.VEHICLE, vehicleHandler);
                handlers.set(ResourceType.MEETING_ROOM, meetingRoomHandler);
                handlers.set(ResourceType.ACCOMMODATION, accommodationHandler);
                return handlers;
            },
            inject: [VehicleResourceHandler, MeetingRoomResourceHandler, AccommodationResourceHandler],
        },
        ResourceUsecase,
        ResourceGroupUsecase,
    ],
    controllers: [ResourceController, 
        ResourceGroupController, 
        AdminResourceController, 
        AdminResourceGroupController,   
        UserResourceGroupController, 
        UserResourceController],
    exports: [ResourceService, ResourceGroupService, ResourceManagerService],
})
export class ResourceModule {}
