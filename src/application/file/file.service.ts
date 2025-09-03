import { BadRequestException, Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { UploadFileUsecase } from './usecases/upload-file.usecase';
import { DeleteFileUsecase } from './usecases/delete-file.usecase';
import { FindTemporaryFileUsecase } from './usecases/find-temporary-file.usecase';
import { GetPresignedUrlUsecase } from './usecases/get-presigned-url.usecase';
import { MimeType } from '@libs/enums/mime-type.enum';
import { CreateFileDataDto } from './dtos/create-filedata.dto';
import { CreateFileDataUsecase } from './usecases/create-file-data.usecase';

@Injectable()
export class FileService {
    constructor(
        private readonly uploadFileUsecase: UploadFileUsecase,
        private readonly deleteFileUsecase: DeleteFileUsecase,
        private readonly findTemporaryFileUsecase: FindTemporaryFileUsecase,
        private readonly getPresignedUrlUsecase: GetPresignedUrlUsecase,
        private readonly createFileDataUsecase: CreateFileDataUsecase,
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

    async getPresignedUrl(mime: MimeType): Promise<string> {
        if (!mime) {
            throw new BadRequestException('Mime type is required');
        }
        return this.getPresignedUrlUsecase.execute(mime);
    }

    async createFileData(createFileDataDto: CreateFileDataDto): Promise<File> {
        return this.createFileDataUsecase.execute(createFileDataDto);
    }
}
