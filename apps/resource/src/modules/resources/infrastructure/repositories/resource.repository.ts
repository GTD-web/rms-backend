import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from '../../domain/entities/resource.entity';

@Injectable()
export class ResourceRepository {
    constructor(
        @InjectRepository(Resource)
        private readonly repository: Repository<Resource>,
    ) {}

    // 저장소 메서드 구현 예정
}
