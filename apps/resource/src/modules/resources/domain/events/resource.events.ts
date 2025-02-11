export class ResourceEvent {
    constructor(
        public readonly resourceId: string,
        public readonly userId: string,
        public readonly action: 'allocated' | 'released' | 'approved',
        public readonly timestamp: Date = new Date(),
    ) {}
}

// 도메인 이벤트
export class ResourceAllocatedEvent extends ResourceEvent {
    constructor(resourceId: string, userId: string) {
        super(resourceId, userId, 'allocated');
    }
}

export class ResourceReleasedEvent extends ResourceEvent {
    constructor(resourceId: string, userId: string) {
        super(resourceId, userId, 'released');
    }
}
