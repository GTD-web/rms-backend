import { ObjectLiteral, QueryRunner, FindOptionsWhere, DeepPartial, FindOptionsOrder } from 'typeorm';

export interface IRepositoryOptions<T = any> {
    queryRunner?: QueryRunner;
    where?: FindOptionsWhere<T>;
    relations?: string[];
    select?: string[];
    order?: FindOptionsOrder<T>;
    skip?: number;
    take?: number;
    withDeleted?: boolean;
}

export interface IRepository<T extends ObjectLiteral> {
    create(entity: DeepPartial<T>, repositoryOptions?: IRepositoryOptions): Promise<T>;
    save(entity: DeepPartial<T>, repositoryOptions?: IRepositoryOptions): Promise<T>;
    findOne(repositoryOptions?: IRepositoryOptions): Promise<T | null>;
    findAll(repositoryOptions?: IRepositoryOptions): Promise<T[]>;
    update(entityId: string, entity: Partial<T>, repositoryOptions?: IRepositoryOptions): Promise<T>;
    delete(entityId: string, repositoryOptions?: IRepositoryOptions): Promise<void>;
}
