export interface IEmployee {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    departmentId: string;
    position: string;
    status: string;
}

export interface IEmployeeService {
    findById(id: string): Promise<IEmployee>;
    findByDepartment(departmentId: string): Promise<IEmployee[]>;
    // ... 추가 메서드
}
