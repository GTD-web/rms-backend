import { ENV } from './env.config';

export const getBullConfig = () => {
    return {
        connection: {
            host: ENV.REDIS_HOST,
            port: +ENV.REDIS_PORT,
        },
    };
};
