export class EmployeeDto {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    departmentId: string;
    position: string;
    status: string;
}

export class DepartmentDto {
    id: string;
    code: string;
    name: string;
    parentId?: string;
    level: number;
    status: string;
}
