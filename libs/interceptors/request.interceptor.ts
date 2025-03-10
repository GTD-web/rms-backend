import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;

        console.log(`[Request] ${method} ${url}`);
        if (Object.keys(body).length > 0) {
            console.log('Body:', body);
        }
        if (Object.keys(query).length > 0) {
            console.log('Query:', query);
        }
        if (Object.keys(params).length > 0) {
            console.log('Params:', params);
        }

        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                console.log(`[Response Time] ${Date.now() - now}ms`);
            }),
        );
    }
}
