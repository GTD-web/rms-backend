import { Resource } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
export interface ResourceTypeHandler {
    createTypeInfo(resource: Resource, typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<void>;
    // updateTypeInfo(resource: Resource, typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<void>;
    // getTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<any>;
    // deleteTypeInfo(resourceId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
    // validateTypeData(typeInfo: any, repositoryOptions?: RepositoryOptions): Promise<boolean>;
}
