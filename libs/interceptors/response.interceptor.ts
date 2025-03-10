import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

export interface FilterResult<T> {
    items: T[];
    total: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((data): ApiResponse<T> => {
                console.log(data);
                // FilterResult 타입의 페이지네이션 데이터인 경우
                if (this.isFilterResult(data)) {
                    return {
                        success: true,
                        data: data.items as T,
                        meta: {
                            total: data.total,
                            page: data.page,
                            limit: data.limit,
                            hasNext: data.hasNext,
                        },
                    };
                }

                // 일반 데이터인 경우
                return {
                    success: true,
                    data: data as T,
                    message: '요청이 성공적으로 처리되었습니다.',
                };
            }),
        );
    }

    private isFilterResult(data: any): data is FilterResult<T> {
        return data && Array.isArray(data.items) && typeof data.total === 'number';
    }
}
