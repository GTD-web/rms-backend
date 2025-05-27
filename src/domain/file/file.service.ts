import { Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { BaseService } from '@libs/services/base.service';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService extends BaseService<File> {
    constructor(private readonly fileRepository: FileRepository) {
        super(fileRepository);
    }
}
