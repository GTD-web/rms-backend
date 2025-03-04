import { File } from '@libs/entities';

export interface FileRepositoryPort {
    save(file: Partial<File>): Promise<File>;
    findById(fileId: string): Promise<File | null>;
    findByFilePath(filePath: string): Promise<File | null>;
    delete(fileId: string): Promise<void>;
}
