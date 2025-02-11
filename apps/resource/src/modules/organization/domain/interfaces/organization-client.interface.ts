export interface IOrganizationClient {
    getEmployee(id: string): Promise<IEmployee>;
    getEmployeesByDepartment(departmentId: string): Promise<IEmployee[]>;
    getDepartment(id: string): Promise<IDepartment>;
    getDepartmentChildren(parentId: string): Promise<IDepartment[]>;
    // ... 추가 외부 시스템 연동 메서드
}
