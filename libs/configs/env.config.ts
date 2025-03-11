import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';

config();

export const ENV = process.env;

export default registerAs('database', () => {
    return {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
        database: process.env.POSTGRES_DB || 'resource-server',
    };
});

export const JWT_CONFIG = registerAs('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    };
});

export const WEB_PUSH_CONFIG = registerAs('webPush', () => {
    return {
        publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
        privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
    };
});

export const APP_CONFIG = registerAs('app', () => {
    return {
        url: process.env.NODE_ENV === 'production' ? 'http://localhost:5001' : 'http://localhost:3000',
        port: process.env.NODE_ENV === 'production' ? 5001 : 3000,
        storage: {
            type: process.env.NODE_ENV,
        },
    };
});
