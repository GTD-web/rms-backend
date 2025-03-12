import { Module } from '@nestjs/common';
import { FileService } from './application/services/file.service';
import { FileController } from './infrastructure/adapters/in/web/controllers/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@libs/entities';
import { FileRepository } from './infrastructure/adapters/out/persistence/file.repository';
import { LocalStorageAdapter } from './infrastructure/adapters/out/storage/local-storage.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_CONFIG } from '@libs/configs/env.config';
import { S3StorageAdapter } from './infrastructure/adapters/out/storage/s3-stroage.adapter';
@Module({
    imports: [TypeOrmModule.forFeature([File]), ConfigModule.forFeature(APP_CONFIG)],
    controllers: [FileController],
    providers: [
        ConfigService,
        FileService,
        {
            provide: 'FileRepositoryPort',
            useClass: FileRepository,
        },
        {
            provide: 'FileStoragePort',
            useFactory: (configService: ConfigService) => {
                const StorageAdapter =
                    configService.get('storage.type') === 'local' ? LocalStorageAdapter : S3StorageAdapter;
                return new StorageAdapter(configService);
            },
            inject: [ConfigService],
        },
    ],
    exports: [FileService],
})
export class FileModule {}
