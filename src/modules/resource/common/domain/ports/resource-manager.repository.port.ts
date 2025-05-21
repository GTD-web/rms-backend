import { ResourceManager } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ResourceManagerRepositoryPort {
    save(resourceManager: Partial<ResourceManager>, repositoryOptions?: RepositoryOptions): Promise<ResourceManager>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceManager | null>;
    find(repositoryOptions?: RepositoryOptions): Promise<ResourceManager[]>;
    update(
        id: string,
        resourceManager: Partial<ResourceManager>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceManager>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
