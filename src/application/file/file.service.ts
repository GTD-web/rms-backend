import { Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { UploadFileUsecase } from './usecases/upload-file.usecase';
import { DeleteFileUsecase } from './usecases/delete-file.usecase';

@Injectable()
export class FileService {
    constructor(
        private readonly uploadFileUsecase: UploadFileUsecase,
        private readonly deleteFileUsecase: DeleteFileUsecase,
    ) {}

    async uploadFile(file: Express.Multer.File): Promise<File> {
        return await this.uploadFileUsecase.execute(file);
    }

    async deleteFile(fileId: string): Promise<void> {
        await this.deleteFileUsecase.execute(fileId);
    }
}
