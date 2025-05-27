import { Module } from '@nestjs/common';
import { FileService } from './application/services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@libs/entities';
import { FileRepository } from './infrastructure/adapters/out/persistence/file.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_CONFIG } from '@libs/configs/env.config';

@Module({
    imports: [TypeOrmModule.forFeature([File]), ConfigModule.forFeature(APP_CONFIG)],
    controllers: [],
    providers: [
        ConfigService,
        FileService,
        {
            provide: 'FileRepositoryPort',
            useClass: FileRepository,
        },
    ],
    exports: [FileService],
})
export class FileModule {}
