import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './domain/entities/resource.entity';
import { ResourceService } from './application/services/resource.service';
import { ResourceController } from './presentation/controllers/resource.controller';
import { ResourceRepository } from './infrastructure/repositories/resource.repository';
import { NotificationClientModule } from '@lib/shared/modules/notification-client';

@Module({
    imports: [TypeOrmModule.forFeature([Resource]), NotificationClientModule],
    controllers: [ResourceController],
    providers: [ResourceService, ResourceRepository],
    exports: [ResourceService],
})
export class ResourcesModule {}
