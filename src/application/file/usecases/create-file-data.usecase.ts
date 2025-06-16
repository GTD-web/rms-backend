import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainFileService } from '@src/domain/file/file.service';
import { File } from '@libs/entities/file.entity';
import { CreateFileDataDto } from '../dtos/create-filedata.dto';
import { S3Service } from '../infrastructure/s3.service';

@Injectable()
export class CreateFileDataUsecase {
    constructor(
        private readonly fileService: DomainFileService,
        private readonly s3Service: S3Service,
    ) {}

    retryCount = 3;

    async execute(createFileDataDto: CreateFileDataDto): Promise<File> {
        const fileName = createFileDataDto.filePath.split('/').pop();
        const fileExists = await this.s3Service.checkFileExists(fileName);
        // let retryCount = this.retryCount;
        // while (!fileExists && retryCount > 0) {
        //     console.log('file not found in S3, retrying...');
        //     await new Promise((resolve) => setTimeout(resolve, 100));
        //     fileExists = await this.s3Service.checkFileExists(createFileDataDto.fileName);
        //     retryCount--;
        // }
        if (!fileExists) {
            throw new BadRequestException('File not found in S3');
        }
        const file = await this.fileService.create({
            fileName,
            filePath: this.s3Service.getFileUrl(fileName),
        });
        return await this.fileService.save(file);
    }
}
