import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiProperty,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { PaginationMeta } from '../interfaces/api-response.interface';

// 기본 응답 DTO
export class BaseResponseDto<T> {
    @ApiProperty({ example: true, type: 'except' })
    success: boolean;

    @ApiProperty({ required: true, description: '응답 데이터', type: 'except' })
    data: T;

    @ApiProperty({ required: false, example: '성공적으로 처리되었습니다.', description: '성공 메시지', type: 'except' })
    message?: string;
}

// 페이지네이션 응답 DTO
export class PaginatedResponseDto<T> extends BaseResponseDto<T[]> {
    @ApiProperty()
    meta: PaginationMeta;
}

// 에러 응답 DTO
export class ErrorResponseDto {
    @ApiProperty({ example: false, type: 'except' })
    success: boolean;

    @ApiProperty({ example: 400, type: 'except' })
    statusCode: number;

    @ApiProperty({ example: '잘못된 요청입니다.', type: 'except' })
    message: string;
}

// 공통 에러 응답 데코레이터
const ApiCommonErrors = () =>
    applyDecorators(
        ApiBadRequestResponse({ description: '잘못된 요청입니다.', type: ErrorResponseDto }), // 하나만 예시로 표시
        ApiUnauthorizedResponse({ description: '인증되지 않은 요청입니다.' }),
        ApiForbiddenResponse({ description: '권한이 없습니다.' }),
        ApiNotFoundResponse({ description: '리소스를 찾을 수 없습니다.' }),
        ApiConflictResponse({ description: '중복된 리소스입니다.' }),
        ApiInternalServerErrorResponse({ description: '서버 에러가 발생했습니다.' }),
    );

// 단일 응답 데코레이터
export const ApiDataResponse = (options: {
    status?: number;
    description: string;
    type?: any;
    isPaginated?: boolean;
}) => {
    const schema = options.type
        ? {
              allOf: [
                  { $ref: getSchemaPath(options.isPaginated ? PaginatedResponseDto : BaseResponseDto) },
                  {
                      properties: {
                          data:
                              options.isPaginated || Array.isArray(options.type)
                                  ? {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(
                                                Array.isArray(options.type) ? options.type[0] : options.type,
                                            ),
                                        },
                                    }
                                  : {
                                        $ref: getSchemaPath(options.type),
                                    },
                      },
                  },
              ],
          }
        : {
              properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: options.description },
              },
          };

    return applyDecorators(
        ApiOkResponse({
            status: options.status || 200,
            description: options.description || '성공적으로 처리되었습니다.',
            schema,
        }),
        ApiCommonErrors(),
    );
};
