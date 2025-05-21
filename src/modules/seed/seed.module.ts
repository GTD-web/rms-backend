import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';

import { AccommodationInfo, MeetingRoomInfo, ResourceGroup, ResourceManager, VehicleInfo } from '@libs/entities';
import { Resource } from '@libs/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ResourceGroup,
            Resource,
            ResourceManager,
            VehicleInfo,
            AccommodationInfo,
            MeetingRoomInfo,
        ]),
    ],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}
