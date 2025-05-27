import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { BaseRepository } from '@libs/repositories/base.repository';

@Injectable()
export class DomainNotificationRepository extends BaseRepository<Notification> {
    constructor(
        @InjectRepository(Notification)
        repository: Repository<Notification>,
    ) {
        super(repository);
    }
}
