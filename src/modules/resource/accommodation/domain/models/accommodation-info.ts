export interface AccommodationInfoProps {
  accommodationInfoId?: string;
  resourceId: string;
}

export class AccommodationInfo {
  private readonly props: AccommodationInfoProps;

  constructor(props: Omit<AccommodationInfoProps, 'accommodationInfoId'> & { accommodationInfoId?: string }) {
    this.validateProps(props);
    this.props = props;
  }

  private validateProps(props: AccommodationInfoProps) {
    if (!props.resourceId) {
      throw new Error('Resource ID is required');
    }
  }

  get accommodationInfoId(): string | undefined {
    return this.props.accommodationInfoId;
  }

  get resourceId(): string {
    return this.props.resourceId;
  }

  toJSON(): AccommodationInfoProps {
    return { ...this.props };
  }
} 