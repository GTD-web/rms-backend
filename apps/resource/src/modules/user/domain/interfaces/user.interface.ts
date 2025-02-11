export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    employeeId?: string;
    permissions: string[];
    status: string;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserService {
    findById(id: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    create(user: Partial<IUser>): Promise<IUser>;
    update(id: string, user: Partial<IUser>): Promise<IUser>;
}
