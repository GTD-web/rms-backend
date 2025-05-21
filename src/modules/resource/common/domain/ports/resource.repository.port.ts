import { Resource } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ResourceRepositoryPort {
    save(resource: Partial<Resource>, repositoryOptions?: RepositoryOptions): Promise<Resource>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<Resource | null>;
    find(repositoryOptions?: RepositoryOptions): Promise<Resource[]>;
    update(id: string, resource: Partial<Resource>, repositoryOptions?: RepositoryOptions): Promise<Resource>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
    softDelete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
