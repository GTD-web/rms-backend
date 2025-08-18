import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '@libs/entities/schedule.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainScheduleRepository extends BaseRepository<Schedule> {
    constructor(
        @InjectRepository(Schedule)
        repository: Repository<Schedule>,
    ) {
        super(repository);
    }
}
