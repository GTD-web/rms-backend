import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainTesterInfoService } from './tester-info.service';
import { DomainTesterInfoRepository } from './tester-info.repository';
import { TesterInfo } from '@libs/entities/tester-info.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TesterInfo])],
    providers: [DomainTesterInfoService, DomainTesterInfoRepository],
    exports: [DomainTesterInfoService],
})
export class DomainTesterInfoModule {}
