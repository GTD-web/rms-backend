export interface MeetingRoomInfoProps {
  meetingRoomInfoId?: string;
  resourceId: string;
}

export class MeetingRoomInfo {
  private readonly props: MeetingRoomInfoProps;

  constructor(props: Omit<MeetingRoomInfoProps, 'meetingRoomInfoId'> & { meetingRoomInfoId?: string }) {
    this.validateProps(props);
    this.props = props;
  }

  private validateProps(props: MeetingRoomInfoProps) {
    if (!props.resourceId) {
      throw new Error('Resource ID is required');
    }
  }

  get meetingRoomInfoId(): string | undefined {
    return this.props.meetingRoomInfoId;
  }

  get resourceId(): string {
    return this.props.resourceId;
  }

  toJSON(): MeetingRoomInfoProps {
    return { ...this.props };
  }
} 