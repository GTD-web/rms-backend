export class CreateNotificationEvent {
    constructor(
        public readonly userId: string,
        public readonly title: string,
        public readonly body: string,
        public readonly type: string,
        public readonly data?: Record<string, any>,
    ) {}
}
