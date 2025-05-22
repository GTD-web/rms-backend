import { DeepPartial, ObjectLiteral } from 'typeorm';
import { IRepositoryOptions } from './repository.interface';

export interface IService<T extends ObjectLiteral> {
    create(entity: DeepPartial<T>, options?: IRepositoryOptions): Promise<T>;
    save(entity: DeepPartial<T>, options?: IRepositoryOptions): Promise<T>;
    findAll(options?: IRepositoryOptions): Promise<T[]>;
    findOne(options: IRepositoryOptions): Promise<T | null>;
    update(id: string, entity: Partial<T>, options?: IRepositoryOptions): Promise<T>;
    delete(id: string, options?: IRepositoryOptions): Promise<void>;
}
