import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@libs/entities/file.entity';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    providers: [FileService, FileRepository],
    exports: [FileService],
})
export class FileModule {}
