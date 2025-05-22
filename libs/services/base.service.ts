import { Injectable } from '@nestjs/common';
import { IRepository } from '../interfaces/repository.interface';
import { IService } from '../interfaces/service.interface';
import { IRepositoryOptions } from '../interfaces/repository.interface';
import { ObjectLiteral, DeepPartial } from 'typeorm';

@Injectable()
export abstract class BaseService<T extends ObjectLiteral> implements IService<T> {
    protected constructor(protected readonly repository: IRepository<T>) {}

    async create(entity: DeepPartial<T>, options?: IRepositoryOptions): Promise<T> {
        return this.repository.create(entity, options);
    }

    async save(entity: DeepPartial<T>, options?: IRepositoryOptions): Promise<T> {
        return this.repository.save(entity, options);
    }

    async findAll(options?: IRepositoryOptions): Promise<T[]> {
        return this.repository.findAll(options);
    }

    async findOne(options: IRepositoryOptions): Promise<T | null> {
        return this.repository.findOne(options);
    }

    async update(id: string, entity: Partial<T>, options?: IRepositoryOptions): Promise<T> {
        return this.repository.update(id, entity, options);
    }

    async delete(id: string, options?: IRepositoryOptions): Promise<void> {
        return this.repository.delete(id, options);
    }
}
