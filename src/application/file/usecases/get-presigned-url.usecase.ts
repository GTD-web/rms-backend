import { Injectable } from '@nestjs/common';
import { S3Service } from '../infrastructure/s3.service';
import { MimeType } from '@libs/enums/mime-type.enum';

@Injectable()
export class GetPresignedUrlUsecase {
    constructor(private readonly s3Service: S3Service) {}

    async execute(mime: MimeType): Promise<string> {
        return this.s3Service.generatePresignedUrl(mime);
    }
}
