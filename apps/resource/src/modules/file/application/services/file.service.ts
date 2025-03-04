import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FileRepositoryPort } from '../../domain/ports/file.repository.port';
import { FileStoragePort } from '../../domain/ports/file-storage.port';
import { File } from '../../domain/models/file';
import { ConfigService } from '@nestjs/config';
import { FileMapper } from '../mappers/file.mapper';

@Injectable()
export class FileService {
    constructor(
        @Inject('FileRepositoryPort')
        private readonly fileRepository: FileRepositoryPort,
        @Inject('FileStoragePort')
        private readonly fileStorage: FileStoragePort,
        private readonly configService: ConfigService,
    ) {}

    async findFileById(fileId: string): Promise<File> {
        const file = await this.fileRepository.findById(fileId);
        return FileMapper.toDomain(file);
    }

    async saveFile(file: File): Promise<File> {
        const savedFile = await this.fileRepository.save(FileMapper.toEntity(file));
        return FileMapper.toDomain(savedFile);
    }

    async uploadFile(file: Express.Multer.File): Promise<File> {
        const newFile = await this.fileStorage.uploadFile(file);
        const savedFile = await this.saveFile(newFile);
        return savedFile;
    }

    async deleteFile(fileId: string): Promise<void> {
        const file = await this.findFileById(fileId);
        if (!file) throw new NotFoundException('File not found');

        await this.fileStorage.deleteFile(file.filePath);
        await this.fileRepository.delete(fileId);
    }
}
