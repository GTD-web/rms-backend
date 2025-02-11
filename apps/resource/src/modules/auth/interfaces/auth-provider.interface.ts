export interface IAuthProvider {
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<string>;
    verify(token: string): Promise<any>;
}
