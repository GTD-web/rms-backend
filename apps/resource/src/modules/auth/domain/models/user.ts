import { Employee } from '@libs/entities';
import { Role } from '@libs/enums/role-type.enum';
import * as bcrypt from 'bcrypt';

export interface UserProps {
    userId?: string;
    employeeId: string;
    email: string;
    password: string;
    accessToken?: string;
    expiredAt?: string;
    subscription?: string;
    roles?: Role[];
    name?: string;
    employeeNumber?: string;
    department?: string;
    position?: string;
}

export class User {
    private readonly props: UserProps;

    constructor(props: UserProps) {
        this.validateProps(props);
        this.props = props;
    }

    private validateProps(props: UserProps) {
        if (!props.email) throw new Error('Email is required');
        if (!props.employeeId) throw new Error('Employee ID is required');
        if (!props.password) throw new Error('Password is required');
    }

    get userId(): string {
        return this.props.userId;
    }

    get employeeId(): string {
        return this.props.employeeId;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get accessToken(): string {
        return this.props.accessToken;
    }

    get expiredAt(): string {
        return this.props.expiredAt;
    }

    get subscription(): string {
        return this.props.subscription;
    }

    get roles(): Role[] {
        return this.props.roles;
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

    async checkPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.props.password);
    }

    async updatePassword(password: string): Promise<void> {
        this.props.password = await bcrypt.hash(password, 10);
    }

    updateAccessToken(token: string, expiredAt: string): void {
        this.props.accessToken = token;
        this.props.expiredAt = expiredAt;
    }

    addRole(role: Role): void {
        if (!this.props.roles.includes(role)) {
            this.props.roles.push(role);
        }
    }

    removeRole(role: Role): void {
        this.props.roles = this.props.roles.filter((r) => r !== role);
    }

    toJSON(): UserProps {
        return { ...this.props };
    }
}
