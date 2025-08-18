import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource, ReservationVehicle, VehicleInfo } from '@libs/entities';

// Domain Modules
import { DomainResourceModule } from '@src/domain/resource/resource.module';
import { DomainReservationVehicleModule } from '@src/domain/reservation-vehicle/reservation-vehicle.module';
import { DomainVehicleInfoModule } from '@src/domain/vehicle-info/vehicle-info.module';

// Context Services
import { ResourceVehicleInfoService } from './services/resource-vehicle-info.service';
import { DomainFileReservationVehicleModule } from '@src/domain/file-reservation-vehicle/file-reservation-vehicle.module';
import { DomainFileModule } from '@src/domain/file/file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Resource, VehicleInfo, ReservationVehicle]),
        // Domain Layer Modules
        DomainResourceModule,
        DomainReservationVehicleModule,
        DomainVehicleInfoModule,
    ],
    controllers: [],
    providers: [
        // Context Services
        ResourceVehicleInfoService,
    ],
    exports: [
        // Context Services
        ResourceVehicleInfoService,
    ],
})
export class ResourceManagementContextModule {}
