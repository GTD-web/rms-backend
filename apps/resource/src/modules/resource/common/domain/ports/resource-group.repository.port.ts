import { ResourceGroup } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface ResourceGroupRepositoryPort {
    save(resourceGroup: Partial<ResourceGroup>, repositoryOptions?: RepositoryOptions): Promise<ResourceGroup>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<ResourceGroup | null>;
    find(repositoryOptions?: RepositoryOptions): Promise<ResourceGroup[]>;
    update(
        id: string,
        resourceGroup: Partial<ResourceGroup>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<ResourceGroup>;
    delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
