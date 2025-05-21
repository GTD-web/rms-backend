import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    PushNotificationPort,
    PushNotificationSubscription,
    PushNotificationPayload,
    PushNotificationSendResult,
} from '@resource/modules/notification/domain/ports/push-notification.port';
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging, BatchResponse } from 'firebase-admin/messaging';

@Injectable()
export class FCMAdapter implements PushNotificationPort {
    constructor(private readonly configService: ConfigService) {
        try {
            initializeApp({
                credential: cert({
                    clientEmail: this.configService.get('firebase.clientEmail'),
                    privateKey: this.configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
                    projectId: this.configService.get('firebase.projectId'),
                }),
            });
            console.log('Firebase Admin initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    }

    async sendNotification(
        subscription: PushNotificationSubscription,
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

    async bulkSendNotification(
        subscriptions: PushNotificationSubscription[],
        payload: PushNotificationPayload,
    ): Promise<BatchResponse> {
        try {
            // 동일 토큰 제거
            const tokens = subscriptions.map((subscription) => subscription.fcm.token);
            // const set = new Set(messages);
            // const uniqueMessages = Array.from(set);
            // console.log(uniqueMessages);
            const response = await getMessaging()
                .sendEachForMulticast({
                    tokens: tokens,
                    // notification: {
                    //     title: 'notification : ' + payload.title,
                    //     body: 'notification : ' + payload.body,
                    // },
                    data: {
                        title: payload.title,
                        body: payload.body,
                    },
                })
                .then((response) => {
                    console.log('FCM send successful. Message ID:', response);
                    return response;
                });
            return response;
        } catch (error) {
            return { responses: [], successCount: -1, failureCount: -1 };
        }
    }

    async sendTestNotification(subscription: PushNotificationSubscription, payload: any) {
        try {
            const message = {
                token: subscription.fcm.token,
                ...payload,
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
}
