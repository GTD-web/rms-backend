import { DateUtil } from '@libs/utils/date.util';
import { Injectable } from '@nestjs/common';
import { FileStoragePort, FileUploadOptions } from '@resource/modules/file/domain/ports/file-storage.port';
import { createWriteStream, unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { existsSync, mkdirSync } from 'fs';
import { File } from '@libs/entities';

const unlinkAsync = promisify(unlink);

@Injectable()
export class LocalStorageAdapter implements FileStoragePort {
    constructor() {
        const uploadDir = join(__dirname, '..', '..', '..', 'uploads');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }
    }
    private readonly uploadDir = join(__dirname, '..', '..', '..');

    async uploadFile(file: Express.Multer.File, options?: FileUploadOptions): Promise<File> {
        const filename = `${DateUtil.now().format('YYYYMMDDHHmmss')}-${file.originalname}`;
        const filePath = join(this.uploadDir, '/uploads', filename);

        const newFile = {
            fileName: file.originalname,
            filePath: `/uploads/${filename}`,
        } as File;

        return new Promise((resolve, reject) => {
            const writeStream = createWriteStream(filePath);
            writeStream.write(file.buffer);
            writeStream.end();
            writeStream.on('finish', () => resolve(newFile));
            writeStream.on('error', reject);
        });
    }

    async deleteFile(file: File): Promise<void> {
        const fullPath = join(this.uploadDir, file.filePath);
        await unlinkAsync(fullPath);
    }
}
