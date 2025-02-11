import { Injectable, Inject } from '@nestjs/common';
import { IAuthProvider } from '../interfaces/auth-provider.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IAuthProvider')
        private readonly authProvider: IAuthProvider,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        return this.authProvider.validateUser(email, password);
    }

    async login(user: any): Promise<{ access_token: string }> {
        const token = await this.authProvider.login(user);
        return {
            access_token: token,
        };
    }
}
