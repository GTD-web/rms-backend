import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging, BatchResponse } from 'firebase-admin/messaging';

import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { PushNotificationPayload } from '../dtos/send-notification.dto';
import { PushNotificationSendResult } from '../dtos/response-notification.dto';

@Injectable()
export class FCMAdapter {
    constructor(private readonly configService: ConfigService) {
        try {
            if (getApps().length === 0) {
                initializeApp({
                    credential: cert({
                        clientEmail: this.configService.get('firebase.clientEmail'),
                        privateKey: this.configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
                        projectId: this.configService.get('firebase.projectId'),
                    }),
                });
                console.log('✅ Firebase Admin initialized successfully');
            } else {
                console.log('⚡ Firebase Admin already initialized, skipping');
            }
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }

        process.on('unhandledRejection', (reason, promise) => {
            console.error('🧨 Unhandled Rejection:', reason);
        });
    }

    isProduction = process.env.NODE_ENV === 'production';

    async sendNotification(
        subscription: PushSubscriptionDto,
        payload: PushNotificationPayload,
    ): Promise<PushNotificationSendResult> {
        try {
            if (!subscription || !subscription.fcm || !subscription.fcm.token) {
                throw new BadRequestException('FCM token is missing');
            }
            const message = {
                token: subscription.fcm.token,
                notification: {
                    title: payload.title,
                    body: payload.body,
                },
                data: {
                    title: payload.title,
                    body: payload.body,
                },
            };

            const response = await getMessaging()
                .send(message)
                .then((response) => {
                    console.log('FCM send successful. Message ID:', response);
                    return { success: true, message: response, error: null };
                })
                .catch((error) => {
                    console.error('FCM send error:', {
                        code: error.code,
                        message: error.message,
                        details: error.details,
                        stack: error.stack,
                    });
                    return { success: false, message: 'failed', error: error.message };
                });
            return response;
        } catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { success: false, message: 'failed', error: error.message };
        }
    }

    async sendBulkNotification(tokens: string[], payload: PushNotificationPayload): Promise<BatchResponse> {
        try {
            console.log('알림 전송 - tokens', tokens);
            console.log('알림 전송 - payload', payload);
            const response = await getMessaging()
                .sendEachForMulticast({
                    tokens: tokens,
                    data: {
                        title: this.isProduction ? payload.title : '[개발]' + payload.title,
                        body: payload.body,
                        notificationData: JSON.stringify(payload.notificationData),
                        notificationType: payload.notificationType,
                    },
                    android: {
                        priority: 'high',
                    },
                })
                .then((response) => {
                    console.log('FCM send successful.', response);
                    return response;
                });

            return response;
        } catch (error) {
            console.error('FCM send error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            });
            return { responses: [], successCount: -1, failureCount: -1 };
        }
    }
}
