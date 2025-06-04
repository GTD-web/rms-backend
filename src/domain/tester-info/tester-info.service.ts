import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainTesterInfoRepository } from './tester-info.repository';
import { BaseService } from '@libs/services/base.service';
import { TesterInfo } from '@libs/entities/tester-info.entity';

@Injectable()
export class DomainTesterInfoService extends BaseService<TesterInfo> {
    constructor(private readonly testerInfoRepository: DomainTesterInfoRepository) {
        super(testerInfoRepository);
    }
}
