import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from './env.config';

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
    if (ENV.NODE_ENV === 'production') {
        console.log('Production mode');

        const config: TypeOrmModuleOptions = {
            type: 'postgres',
            host: ENV.POSTGRES_HOST,
            port: +ENV.POSTGRES_PORT,
            username: ENV.POSTGRES_USER,
            password: ENV.POSTGRES_PASSWORD,
            database: ENV.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true,
        };
        console.log('TypeORM Config:', config);
        return config;
    }

    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'tech7admin!',
        database: 'resource-server',

        autoLoadEntities: true,
        synchronize: true,
        logging: ['error'],
        logger: 'advanced-console',
        maxQueryExecutionTime: 1000, // 1초 이상 걸리는 쿼리를 로깅
        cache: {
            duration: 30000, // 30초
        },
    };
};
