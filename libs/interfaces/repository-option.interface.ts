import { QueryRunner, FindOptionsWhere, FindOneOptions, FindManyOptions } from 'typeorm';

export interface RepositoryOptions<T = any> {
    queryRunner?: QueryRunner;
    where?: FindOptionsWhere<T>;
    relations?: string[];
    select?: string[];
    order?: { [P in keyof T]?: 'ASC' | 'DESC' };
    skip?: number;
    take?: number;
}
