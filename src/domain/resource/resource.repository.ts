import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '@libs/entities/resource.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainResourceRepository extends BaseRepository<Resource> {
    constructor(
        @InjectRepository(Resource)
        repository: Repository<Resource>,
    ) {
        super(repository);
    }
}
