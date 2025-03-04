import { NotificationType } from "@libs/enums/notification-type.enum";
import { ResourceType } from "@libs/enums/resource-type.enum";

export interface NotificationProps {
  notificationId?: string;
  title: string;
  body: string;
  notifyType: NotificationType;
  resourceType: ResourceType;
  isRead: boolean;
  createdAt: Date;
}

export class Notification {
  private readonly props: NotificationProps;

  constructor(props: NotificationProps) {
    this.validateProps(props);
    this.props = {
      ...props,
    };
  }

  private validateProps(props: NotificationProps) {
    if (!props.title) {
      throw new Error('Title is required');
    }
    if (!props.body) {
      throw new Error('Body is required');
    }
    if (!props.notifyType) {
      throw new Error('NotifyType is required');
    }
    if (!props.isRead) {
      throw new Error('IsRead is required');
    }
    if (!props.createdAt) {
      throw new Error('CreatedAt is required');
    }
  }

  get notificationId(): string | undefined {
    return this.props.notificationId;
  }

  get title(): string {
    return this.props.title;
  }

  get body(): string {
    return this.props.body;
  }

  get notifyType(): NotificationType {
    return this.props.notifyType;
  }

  get resourceType(): ResourceType {
    return this.props.resourceType;
  }

  get isRead(): boolean {
    return this.props.isRead;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toJSON(): NotificationProps {
    return {
      notificationId: this.notificationId,
      title: this.title,
      body: this.body,
      notifyType: this.notifyType,
      resourceType: this.resourceType,
      isRead: this.isRead,
      createdAt: this.createdAt,
    };
  }
}
