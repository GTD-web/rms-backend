export class CreateUserDto {
    email: string;
    password: string;
    name: string;
    employeeId?: string;
    permissions: string[];
}

export class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    employeeId?: string;
    permissions?: string[];
    status?: string;
}
