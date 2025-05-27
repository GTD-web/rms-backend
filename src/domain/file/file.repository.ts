import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '@libs/entities/file.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class FileRepository extends BaseRepository<File> {
    constructor(
        @InjectRepository(File)
        repository: Repository<File>,
    ) {
        super(repository);
    }
}
