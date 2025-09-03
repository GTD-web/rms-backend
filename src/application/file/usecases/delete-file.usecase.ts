import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../infrastructure/s3.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { File } from '@libs/entities/file.entity';

@Injectable()
export class DeleteFileUsecase {
    constructor(
        private readonly s3Service: S3Service,
        private readonly fileService: DomainFileService,
    ) {}

    async execute(fileId: string): Promise<void> {
        let file: File;
        if (fileId) {
            file = await this.fileService.findFileById(fileId);
            if (!file) throw new NotFoundException(ERROR_MESSAGE.BUSINESS.FILE.NOT_FOUND);
        } else {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.FILE.ID_OR_PATH_REQUIRED);
        }

        await this.s3Service.deleteFile(file);
        await this.fileService.delete(file.fileId);
    }
}
