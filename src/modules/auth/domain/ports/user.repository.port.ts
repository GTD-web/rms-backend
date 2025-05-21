import { User } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface UserRepositoryPort {
    findOne(repositoryOptions?: RepositoryOptions): Promise<User | null>;
    find(repositoryOptions?: RepositoryOptions): Promise<User[]>;
    save(user: Partial<User>, repositoryOptions?: RepositoryOptions): Promise<User>;
    update(userId: string, user: Partial<User>, repositoryOptions?: RepositoryOptions): Promise<User>;
}
