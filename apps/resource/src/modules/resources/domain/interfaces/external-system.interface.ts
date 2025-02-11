export interface IExternalResourceSystem {
    fetchResourceStatus(resourceId: string): Promise<string>;
    updateResourceStatus(resourceId: string, status: string): Promise<void>;
    // ... 외부 시스템 연동 메서드
}
