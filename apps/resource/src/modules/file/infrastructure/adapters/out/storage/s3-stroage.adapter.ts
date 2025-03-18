import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { FileStoragePort, FileUploadOptions } from '@resource/modules/file/domain/ports/file-storage.port';
import { DateUtil } from '@libs/utils/date.util';
import { File } from '@libs/entities';

@Injectable()
export class S3StorageAdapter implements FileStoragePort {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor(private readonly configService: ConfigService) {
        this.bucketName = this.configService.get<string>('S3_BUCKET_NAME');

        this.s3Client = new S3Client({
            region: this.configService.get<string>('S3_REGION'),
            endpoint: this.configService.get<string>('S3_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
            },
            forcePathStyle: true,
        });
    }

    async uploadFile(file: Express.Multer.File, options?: FileUploadOptions): Promise<File> {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${DateUtil.now().format('YYYYMMDDHHmmss')}.${fileExtension}`;

        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: fileName,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }),
            );

            const newFile = {
                fileName: fileName,
                filePath: this.getFileUrl(fileName),
            } as File;

            return newFile;
        } catch (error) {
            throw new Error(`Failed to upload file to S3: ${error.message}`);
        }
    }

    async deleteFile(file: File): Promise<void> {
        try {
            await this.s3Client.send(
                new DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: file.fileName,
                }),
            );
        } catch (error) {
            throw new Error(`Failed to delete file from S3: ${error.message}`);
        }
    }
    getFileUrl(fileKey: string): string {
        return `${this.configService.get<string>('S3_ENDPOINT').replace('s3', 'object/public')}/${this.bucketName}/${fileKey}`;
    }
}
