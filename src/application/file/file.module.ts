import { Module } from '@nestjs/common';
import { DomainFileModule } from '@src/domain/file/file.module';
import { UploadFileUsecase } from './usecases/upload-file.usecase';
import { DeleteFileUsecase } from './usecases/delete-file.usecase';
import { S3Service } from './infrastructure/s3.service';
import { FileController } from './controllers/file.controller';
import { FileService } from './file.service';
import { APP_CONFIG } from '@libs/configs/env.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@libs/entities/file.entity';

@Module({
    imports: [DomainFileModule, TypeOrmModule.forFeature([File]), ConfigModule.forFeature(APP_CONFIG)],
    controllers: [FileController],
    providers: [FileService, UploadFileUsecase, DeleteFileUsecase, S3Service],
    exports: [FileService],
})
export class FileModule {}
