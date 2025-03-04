import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof HttpException) {
          return throwError(() => ({
            success: false,
            message: error.message,
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