import { File } from '@libs/entities';

export interface FileRepositoryPort {
    save(file: Partial<File>): Promise<File>;
    findById(fileId: string): Promise<File | null>;
    findByFilePath(filePath: string): Promise<File | null>;
    findAllByFilePath(filePath: string[]): Promise<File[]>;
    delete(fileId: string): Promise<void>;
}
