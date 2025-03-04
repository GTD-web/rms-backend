export interface EmployeeProps {
  employeeId?: string;
  name: string;
  employeeNumber: string;
  department: string;
  position: string;
}

export class Employee {
  private readonly props: EmployeeProps;

  constructor(props: Omit<EmployeeProps, 'employeeId'> & { employeeId?: string }) {
    this.validateProps(props);
    this.props = props;
  }

  private validateProps(props: EmployeeProps) {
    if (!props.name) {
      throw new Error('Employee name is required');
    }
    if (!props.employeeNumber) {
      throw new Error('Employee number is required');
    }
    if (!props.department) {
      throw new Error('Department is required');
    }
    if (!props.position) {
      throw new Error('Position is required');
    }
  }

  get employeeId(): string | undefined {
    return this.props.employeeId;
  }

  get name(): string {
    return this.props.name;
  }

  get employeeNumber(): string {
    return this.props.employeeNumber;
  }

  get department(): string {
    return this.props.department;
  }

  get position(): string {
    return this.props.position;
  }

  update(props: Partial<Omit<EmployeeProps, 'employeeId'>>): void {
    Object.assign(this.props, props);
  }

  toJSON(): EmployeeProps {
    return { ...this.props };
  }
} 