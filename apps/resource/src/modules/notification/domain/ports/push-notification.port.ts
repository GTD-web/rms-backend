export interface PushNotificationPort<T, R, S> {
    initialize(): Promise<void>;
    sendNotification(
      subscriptions: T | T[],
      payload: R
    ): Promise<S>;
    validateSubscription(subscription: T): boolean;
}
