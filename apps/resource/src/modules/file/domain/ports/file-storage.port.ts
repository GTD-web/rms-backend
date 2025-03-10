import { File } from '../models/file';

export interface FileUploadOptions {
    filename?: string;
    mimetype?: string;
    encoding?: string;
    destination?: string;
}

export interface FileStoragePort {
    uploadFile(file: Express.Multer.File, options?: FileUploadOptions): Promise<File>;
    deleteFile(file: File): Promise<void>;
}
