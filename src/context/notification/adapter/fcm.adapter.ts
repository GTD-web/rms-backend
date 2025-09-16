import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { AxiosError } from 'axios';
import { FcmSendRequestDto } from '../dtos/fcm-send-request.dto';
import { FcmSendResponseDto, FcmBulkSendResponseDto } from '../dtos/fcm-send-response.dto';

@Injectable()
export class FCMMicroserviceAdapter {
    private readonly logger = new Logger(FCMMicroserviceAdapter.name);
    private readonly fcmServiceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        // 환경변수에서 FCM API URL 가져오기
        this.fcmServiceUrl = this.configService.get<string>('FCM_API_URL') || 'https://lumir-erp.vercel.app';
    }

    /**
     * 공통 HTTP 헤더 생성
     * @param authorization 요청에서 전달받은 Authorization 헤더
     * @returns HTTP 헤더 객체
     */
    private getHeaders(authorization?: string): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        return headers;
    }

    /**
     * 단일 FCM 알림 전송
     * @param token FCM 토큰
     * @param payload 알림 내용
     * @param authorization Authorization 헤더 (선택)
     * @returns 전송 결과
     */
    async sendNotification(
        token: string,
        payload: { title: string; body: string; link: string; icon: string },
        authorization?: string,
    ): Promise<FcmSendResponseDto> {
        try {
            if (!token) {
                throw new BadRequestException('FCM token is missing');
            }

            this.logger.log(`FCM 단일 알림 전송 요청: token=${token.substring(0, 20)}...`);

            const requestDto: FcmSendRequestDto = {
                token,
                title: payload.title,
                body: payload.body,
                link: payload.link,
                icon: payload.icon,
            };

            const url = `${this.fcmServiceUrl}/api/fcm/test-send`;
            const response = await firstValueFrom(
                this.httpService
                    .post<FcmSendResponseDto>(url, requestDto, {
                        // headers: this.getHeaders(authorization),
                    })
                    .pipe(
                        map((res) => res.data),
                        catchError((error: AxiosError) => {
                            this.logger.error(`FCM 단일 알림 전송 실패: ${error.message}`, error.stack);

                            let errorMessage = 'FCM 알림 전송 중 오류가 발생했습니다.';
                            let errorCode = 'UNKNOWN_ERROR';

                            if (error.response?.status === 400) {
                                errorMessage = 'FCM 토큰 형식이 올바르지 않습니다.';
                                errorCode = 'INVALID_TOKEN';
                            } else if (error.response?.status === 404) {
                                errorMessage = 'FCM 서비스를 찾을 수 없습니다.';
                                errorCode = 'SERVICE_NOT_FOUND';
                            }

                            // 예외를 던지는 대신 에러 객체를 리턴
                            return of({
                                success: false,
                                message: 'failed',
                                errorMessage,
                                errorCode,
                                messageId: null,
                            });
                        }),
                    ),
            );
            console.log(response);

            this.logger.log(`FCM 단일 알림 전송 성공`);
            return response;
        } catch (error) {
            this.logger.error(`FCM 단일 알림 전송 중 예외 발생: ${error.message}`, error.stack);
            return {
                success: false,
                message: 'failed',
                errorMessage: error.message,
                errorCode: error.code,
                messageId: error.messageId,
            };
        }
    }

    /**
     * 다중 FCM 알림 전송
     * @param tokens FCM 토큰 배열
     * @param payload 알림 내용
     * @param authorization Authorization 헤더 (선택)
     * @returns 전송 결과
     */
    async sendBulkNotification(
        tokens: string[],
        payload: { title: string; body: string; link: string; icon: string },
        authorization?: string,
    ): Promise<FcmBulkSendResponseDto[]> {
        try {
            if (!tokens || tokens.length === 0) {
                throw new BadRequestException('FCM tokens are missing');
            }

            this.logger.log(`FCM 다중 알림 전송 요청: ${tokens.length}개 토큰`);

            const responses: FcmBulkSendResponseDto[] = [];

            for (const token of tokens) {
                const requestDto: FcmSendRequestDto = {
                    token,
                    title: payload.title,
                    body: payload.body,
                    link: payload.link,
                    icon: payload.icon,
                };
                const url = `${this.fcmServiceUrl}/api/fcm/test-send`;

                const response = await firstValueFrom(
                    this.httpService
                        .post<FcmBulkSendResponseDto>(url, requestDto, {
                            headers: this.getHeaders(authorization),
                        })
                        .pipe(
                            map((res) => res.data),
                            catchError((error: AxiosError) => {
                                this.logger.error(`FCM 다중 알림 전송 실패: ${error.message}`, error.stack);

                                let errorMessage = 'FCM 다중 알림 전송 중 오류가 발생했습니다.';
                                let errorCode = 'UNKNOWN_ERROR';

                                if (error.response?.status === 400) {
                                    errorMessage = 'FCM 토큰 형식이 올바르지 않습니다.';
                                    errorCode = 'INVALID_TOKEN';
                                } else if (error.response?.status === 404) {
                                    errorMessage = 'FCM 서비스를 찾을 수 없습니다.';
                                    errorCode = 'SERVICE_NOT_FOUND';
                                }

                                // 예외를 던지는 대신 에러 객체를 리턴
                                return of({
                                    success: false,
                                    successCount: 0,
                                    failureCount: 1,
                                    message: 'failed',
                                    errorMessage,
                                    errorCode,
                                    messageId: null,
                                });
                            }),
                        ),
                );

                this.logger.log(
                    `FCM 다중 알림 전송 성공: 성공 ${response.successCount}개, 실패 ${response.failureCount}개`,
                );
                console.log(response);
                responses.push(response);
            }

            return responses;
        } catch (error) {
            this.logger.error(`FCM 다중 알림 전송 중 예외 발생: ${error.message}`, error.stack);
            // 예외를 던지는 대신 에러 응답 배열을 리턴
            return [
                {
                    success: false,
                    successCount: 0,
                    failureCount: tokens.length,
                    message: 'failed',
                    errorMessage: error.message || 'FCM 다중 알림 전송 중 예외가 발생했습니다.',
                    errorCode: error.code || 'EXCEPTION_ERROR',
                    messageId: null,
                },
            ];
        }
    }
}
