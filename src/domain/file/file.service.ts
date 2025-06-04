import { Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { BaseService } from '@libs/services/base.service';
import { DomainFileRepository } from './file.repository';
import { In } from 'typeorm';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class DomainFileService extends BaseService<File> {
    constructor(private readonly fileRepository: DomainFileRepository) {
        super(fileRepository);
    }

    async findFileById(fileId: string): Promise<File> {
        const file = await this.fileRepository.findOne({ where: { fileId } });
        return file;
    }

    async findFileByFilePath(filePath: string): Promise<File> {
        const file = await this.fileRepository.findOne({ where: { filePath } });
        return file;
    }

    async findAllFilesByFilePath(filePath: string[]): Promise<File[]> {
        if (!filePath || filePath.length === 0) {
            return [];
        }
        const files = await this.fileRepository.findAll({ where: { filePath: In(filePath) } });
        return files;
    }

    async updateTemporaryFiles(
        filePaths: string[],
        isTemporary: boolean,
        repositoryOptions?: IRepositoryOptions<File>,
    ): Promise<void> {
        const files = await this.fileRepository.findAll({ where: { filePath: In(filePaths) } });
        await Promise.all(
            files.map((file) => this.fileRepository.update(file.fileId, { isTemporary }, repositoryOptions)),
        );
    }

    async deleteFilesByFilePath(filePaths: string[], repositoryOptions?: IRepositoryOptions<File>): Promise<void> {
        const files = await this.fileRepository.findAll({ where: { filePath: In(filePaths) } });
        await Promise.all(files.map((file) => this.fileRepository.delete(file.fileId, repositoryOptions)));
    }
}
