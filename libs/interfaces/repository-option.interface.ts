import { QueryRunner, FindOptionsWhere, FindOptionsSelect, FindOptionsOrder } from 'typeorm';

export interface RepositoryOptions<T = any> {
    queryRunner?: QueryRunner;
    where?: FindOptionsWhere<T>;
    relations?: string[];
    select?: FindOptionsSelect<T>;
    order?: FindOptionsOrder<T>;
    skip?: number;
    take?: number;
    withDeleted?: boolean;
}
