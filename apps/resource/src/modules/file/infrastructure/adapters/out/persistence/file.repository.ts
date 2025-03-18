import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File as FileEntity } from '@libs/entities';
import { FileRepositoryPort } from '@resource/modules/file/domain/ports/file.repository.port';

@Injectable()
export class FileRepository implements FileRepositoryPort {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}

    async save(file: FileEntity): Promise<FileEntity> {
        const savedFile = await this.fileRepository.save(file);
        return savedFile;
    }

    async findById(fileId: string): Promise<FileEntity | null> {
        const fileEntity = await this.fileRepository.findOne({ where: { fileId } });
        return fileEntity;
    }

    async findByFilePath(filePath: string): Promise<FileEntity | null> {
        const fileEntity = await this.fileRepository.findOne({ where: { filePath } });
        return fileEntity;
    }

    async delete(fileId: string): Promise<void> {
        await this.fileRepository.delete({ fileId });
    }
}
