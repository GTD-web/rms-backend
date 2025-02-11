export interface INotification {
    id: string;
    userId: string;
    title: string;
    body: string;
    type: NotificationType;
    data?: Record<string, any>;
    isRead: boolean;
    createdAt: Date;
}

export enum NotificationType {
    RESOURCE_ALLOCATED = 'RESOURCE_ALLOCATED',
    RESOURCE_RELEASED = 'RESOURCE_RELEASED',
    TASK_ASSIGNED = 'TASK_ASSIGNED',
    SYSTEM_ALERT = 'SYSTEM_ALERT',
}

export interface INotificationService {
    send(notification: Partial<INotification>): Promise<void>;
    markAsRead(notificationId: string): Promise<void>;
    getUserNotifications(userId: string): Promise<INotification[]>;
    subscribe(userId: string, subscription: PushSubscription): Promise<void>;
}
