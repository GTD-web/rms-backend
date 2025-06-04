import { Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { UploadFileUsecase } from './usecases/upload-file.usecase';
import { DeleteFileUsecase } from './usecases/delete-file.usecase';
import { FindTemporaryFileUsecase } from './usecases/find-temporary-file.usecase';

@Injectable()
export class FileService {
    constructor(
        private readonly uploadFileUsecase: UploadFileUsecase,
        private readonly deleteFileUsecase: DeleteFileUsecase,
        private readonly findTemporaryFileUsecase: FindTemporaryFileUsecase,
    ) {}

    async deleteTemporaryFile(): Promise<void> {
        const files = await this.findTemporaryFileUsecase.execute();
        const deletePromises = files.map((file) => this.deleteFileUsecase.execute(file.fileId));
        await Promise.all(deletePromises);
    }

    async uploadFile(file: Express.Multer.File): Promise<File> {
        return await this.uploadFileUsecase.execute(file);
    }

    async uploadMultipleFiles(files: Express.Multer.File[]): Promise<File[]> {
        const uploadPromises = files.map((file) => this.uploadFileUsecase.execute(file));
        return await Promise.all(uploadPromises);
    }

    async deleteFile(fileId: string): Promise<void> {
        await this.deleteFileUsecase.execute(fileId);
    }

    async deleteMultipleFiles(fileIds: string[]): Promise<void> {
        const deletePromises = fileIds.map((fileId) => this.deleteFileUsecase.execute(fileId));
        await Promise.all(deletePromises);
    }
}
