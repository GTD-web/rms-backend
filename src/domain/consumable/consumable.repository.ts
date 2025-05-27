import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumable } from '@libs/entities/consumable.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainConsumableRepository extends BaseRepository<Consumable> {
    constructor(
        @InjectRepository(Consumable)
        repository: Repository<Consumable>,
    ) {
        super(repository);
    }
}
