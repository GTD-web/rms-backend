import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationInfo } from '@libs/entities';
import { AccommodationInfoService } from './application/services/accommodation-info.service';
import { AccommodationInfoController } from './infrastructure/adapters/in/web/controllers/accommodation-info.controller';
import { AccommodationInfoRepository } from './infrastructure/adapters/out/persistence/accommodation-info.repository';
import { AccommodationResourceHandler } from './application/handlers/accommodation-resource.handler';

@Module({
    imports: [TypeOrmModule.forFeature([AccommodationInfo])],
    providers: [
        AccommodationInfoService,
        AccommodationResourceHandler,
        {
            provide: 'AccommodationInfoRepositoryPort',
            useClass: AccommodationInfoRepository,
        },
    ],
    controllers: [],
    exports: [AccommodationResourceHandler],
})
export class AccommodationResourceModule {}
