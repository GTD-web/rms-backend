import { Injectable } from '@nestjs/common';
import { S3Service } from '../infrastructure/s3.service';
import { File } from '@libs/entities/file.entity';
import { DomainFileService } from '@src/domain/file/file.service';

@Injectable()
export class UploadFileUsecase {
    constructor(
        private readonly s3Service: S3Service,
        private readonly fileService: DomainFileService,
    ) {}

    async execute(file: Express.Multer.File): Promise<File> {
        const newFile = await this.s3Service.uploadFile(file);
        const savedFile = await this.fileService.save(newFile);
        return savedFile;
    }
}
