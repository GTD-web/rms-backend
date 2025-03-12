import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { isObject } from 'class-validator/types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof HttpException) {
                    console.error('Error:', error);
                    const response = error.getResponse();
                    const errorMessage =
                        typeof response === 'object'
                            ? Array.isArray((response as any).message)
                                ? (response as any).message[0]
                                : (response as any).message
                            : error.message;

                    return throwError(() => ({
                        success: false,
                        message: errorMessage,
                        statusCode: error.getStatus(),
                    }));
                }

                // 예상치 못한 에러의 경우
                console.error('Unexpected error:', error);
                return throwError(
                    () =>
                        new InternalServerErrorException({
                            success: false,
                            message: '서버 내부 오류가 발생했습니다.',
                            statusCode: 500,
                        }),
                );
            }),
        );
    }
}
