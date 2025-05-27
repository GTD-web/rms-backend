import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from '@libs/entities/maintenance.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainMaintenanceRepository extends BaseRepository<Maintenance> {
    constructor(
        @InjectRepository(Maintenance)
        repository: Repository<Maintenance>,
    ) {
        super(repository);
    }
}
