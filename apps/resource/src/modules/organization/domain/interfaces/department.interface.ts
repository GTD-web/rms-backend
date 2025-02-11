export interface IDepartment {
    id: string;
    code: string;
    name: string;
    parentId?: string;
    level: number;
    status: string;
}

export interface IDepartmentService {
    findById(id: string): Promise<IDepartment>;
    findChildren(parentId: string): Promise<IDepartment[]>;
    // ... 추가 메서드
}
