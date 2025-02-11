import { Injectable } from '@nestjs/common';
import { IExternalResourceSystem } from '../../domain/interfaces/external-system.interface';

@Injectable()
export class ExternalResourceAdapter implements IExternalResourceSystem {
    async fetchResourceStatus(resourceId: string): Promise<string> {
        // 외부 시스템 연동 구현 예정
        return '';
    }

    async updateResourceStatus(resourceId: string, status: string): Promise<void> {
        // 외부 시스템 연동 구현 예정
    }
}
