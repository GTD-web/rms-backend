import { Injectable } from '@nestjs/common';
import { File } from '@libs/entities/file.entity';
import { DomainFileService } from '@src/domain/file/file.service';
import { LessThan } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';

@Injectable()
export class FindTemporaryFileUsecase {
    constructor(private readonly fileService: DomainFileService) {}

    async execute(): Promise<File[]> {
        return await this.fileService.findAll({
            where: { isTemporary: true, createdAt: LessThan(DateUtil.now().addDays(-1).toDate()) },
        });
    }
}
