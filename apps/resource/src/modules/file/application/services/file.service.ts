import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileRepositoryPort } from '../../domain/ports/file.repository.port';
import { FileStoragePort } from '../../domain/ports/file-storage.port';
import { ConfigService } from '@nestjs/config';
import { File } from '@libs/entities';
import { ERROR_MESSAGE } from '@libs/constants/error-message';

@Injectable()
export class FileService {
    constructor(
        @Inject('FileRepositoryPort')
        private readonly fileRepository: FileRepositoryPort,
        @Inject('FileStoragePort')
        private readonly fileStorage: FileStoragePort,
    ) {}

    async findFileById(fileId: string): Promise<File> {
        const file = await this.fileRepository.findById(fileId);
        return file;
    }

    async findFileByFilePath(filePath: string): Promise<File> {
        const file = await this.fileRepository.findByFilePath(filePath);
        return file;
    }

    async findAllFilesByFilePath(filePath: string[]): Promise<File[]> {
        if (filePath.length === 0) {
            return [];
        }
        const files = await this.fileRepository.findAllByFilePath(filePath);
        return files;
    }

    async saveFile(file: File): Promise<File> {
        const savedFile = await this.fileRepository.save(file);
        return savedFile;
    }

    async uploadFile(file: Express.Multer.File): Promise<File> {
        const newFile = await this.fileStorage.uploadFile(file);
        const savedFile = await this.saveFile(newFile);
        return savedFile;
    }

    async deleteFile({ fileId, filePath }: { fileId?: string; filePath?: string }): Promise<void> {
        let file: File;
        if (fileId) {
            file = await this.findFileById(fileId);
            if (!file) throw new NotFoundException(ERROR_MESSAGE.BUSINESS.FILE.NOT_FOUND);
        } else if (filePath) {
            file = await this.findFileByFilePath(filePath);
            if (!file) throw new NotFoundException(ERROR_MESSAGE.BUSINESS.FILE.NOT_FOUND);
        } else {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.FILE.ID_OR_PATH_REQUIRED);
        }

        await this.fileStorage.deleteFile(file);
        await this.fileRepository.delete(file.fileId);
    }
}
