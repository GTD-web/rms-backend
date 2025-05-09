import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';

import { ResourceGroup, ResourceManager } from '@libs/entities';
import { Resource } from '@libs/entities';

@Module({
    imports: [TypeOrmModule.forFeature([ResourceGroup, Resource, ResourceManager])],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}
