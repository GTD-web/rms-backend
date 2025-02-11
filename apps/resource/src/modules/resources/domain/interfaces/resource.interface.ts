export interface IResource {
    id: string;
    name: string;
    type: string;
    status: string;
    // ... 추가 속성들은 비즈니스 요구사항에 따라 정의
}

// 도메인 서비스 인터페이스
export interface IResourceService {
    allocateResource(resourceId: string): Promise<void>;
    releaseResource(resourceId: string): Promise<void>;
    // ... 추가 도메인 서비스 메서드
}
