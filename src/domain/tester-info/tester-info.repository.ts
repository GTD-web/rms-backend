import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TesterInfo } from '@libs/entities/tester-info.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainTesterInfoRepository extends BaseRepository<TesterInfo> {
    constructor(
        @InjectRepository(TesterInfo)
        repository: Repository<TesterInfo>,
    ) {
        super(repository);
    }
}
