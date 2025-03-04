import { Employee } from '../models/employee';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface EmployeeRepositoryPort {
  save(employee: Employee, repositoryOptions?: RepositoryOptions): Promise<Employee>;
  findById(id: string, repositoryOptions?: RepositoryOptions): Promise<Employee | null>;
  findAll(repositoryOptions?: RepositoryOptions): Promise<Employee[]>;
  update(id: string, employee: Partial<Employee>, repositoryOptions?: RepositoryOptions): Promise<Employee>;
  delete(id: string, repositoryOptions?: RepositoryOptions): Promise<void>;
  findByEmployeeNumber(employeeNumber: string, repositoryOptions?: RepositoryOptions): Promise<Employee | null>;
} 