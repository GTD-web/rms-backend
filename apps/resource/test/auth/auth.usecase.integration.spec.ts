import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthUsecase } from '@resource/modules/auth/application/usecases/jwt-auth.usecase';
import { UserUsecase } from '@resource/modules/auth/application/usecases/user.usecase';
import { SsoAuthUsecase } from '@resource/modules/auth/application/usecases/sso-auth.usecase';
import { AuthModule } from '@resource/modules/auth/auth.module';
import { getTestDbConfig, closeTestContainer } from '../test-db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto } from '@resource/modules/auth/application/dto/login.dto';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { UserRepository } from '@resource/modules/auth/infrastructure/adapters/out/user.repository';
import { User, Employee } from '@libs/entities';
import { v4 as uuidv4 } from 'uuid';
jest.setTimeout(30000); // Increase timeout to 30 seconds

// 테스트용 non-existent UUID
const NON_EXISTENT_UUID = uuidv4();

describe('Auth Usecases Integration Test', () => {
    let moduleRef: TestingModule;
    let jwtAuthUsecase: JwtAuthUsecase;
    let userUsecase: UserUsecase;
    let ssoAuthUsecase: SsoAuthUsecase;
    const TEST_ID = 'auth-usecases-test';

    beforeAll(async () => {
        // Wait for database to be ready
        const dbConfig = await getTestDbConfig(TEST_ID);

        moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [
                        () => ({
                            JWT_SECRET: 'test-secret-key-for-integration-tests',
                        }),
                    ],
                }),
                TypeOrmModule.forRoot({
                    ...dbConfig,
                    autoLoadEntities: true,
                }),
                TypeOrmModule.forFeature([User, Employee]),
                JwtModule.register({
                    secret: 'test-secret-key-for-integration-tests',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
            providers: [
                JwtAuthUsecase,
                UserUsecase,
                SsoAuthUsecase,
                UserService,
                {
                    provide: 'UserRepositoryPort',
                    useClass: UserRepository,
                },
            ],
        }).compile();

        jwtAuthUsecase = moduleRef.get<JwtAuthUsecase>(JwtAuthUsecase);
        userUsecase = moduleRef.get<UserUsecase>(UserUsecase);
        ssoAuthUsecase = moduleRef.get<SsoAuthUsecase>(SsoAuthUsecase);
    });

    afterAll(async () => {
        await moduleRef.close();
        await closeTestContainer(TEST_ID);
    });

    describe('JwtAuthUsecase', () => {
        const loginDto: LoginDto = {
            email: 'kim.jongsik@lumir.space',
            password: '1234',
        };

        describe('validateUser', () => {
            it('should validate user with correct credentials', async () => {
                const user = await jwtAuthUsecase.validateUser(loginDto.email, loginDto.password);
                expect(user).toBeDefined();
                expect(user.email).toBe(loginDto.email);
            });

            it('should throw UnauthorizedException for non-existent user', async () => {
                await expect(jwtAuthUsecase.validateUser('nonexistent@email.com', 'password')).rejects.toThrow(
                    UnauthorizedException,
                );
            });

            it('should throw UnauthorizedException for wrong password', async () => {
                await expect(jwtAuthUsecase.validateUser(loginDto.email, 'wrongpassword')).rejects.toThrow(
                    UnauthorizedException,
                );
            });
        });

        describe('login', () => {
            it('should return login response with token for valid credentials', async () => {
                const response = await jwtAuthUsecase.login(loginDto);
                expect(response).toBeDefined();
                expect(response.accessToken).toBeDefined();
                expect(response.email).toBe(loginDto.email);
                expect(response.name).toBeDefined();
                expect(response.roles).toBeDefined();
            });

            it('should throw UnauthorizedException for invalid credentials', async () => {
                await expect(jwtAuthUsecase.login({ ...loginDto, password: 'wrongpassword' })).rejects.toThrow(
                    UnauthorizedException,
                );
            });
        });
    });

    describe('UserUsecase', () => {
        let userId: string;

        beforeAll(async () => {
            // Login first to get a valid userId
            const response = await jwtAuthUsecase.login({
                email: 'kim.jongsik@lumir.space',
                password: '1234',
            });
            const decodedToken = moduleRef.get(JwtService).decode(response.accessToken) as { userId: string };
            userId = decodedToken.userId;
        });

        describe('findByUserId', () => {
            it('should find user by userId', async () => {
                const user = await userUsecase.findByUserId(userId);
                expect(user).toBeDefined();
                expect(user.userId).toBe(userId);
            });

            it('should throw NotFoundException for non-existent userId', async () => {
                await expect(userUsecase.findByUserId(NON_EXISTENT_UUID)).rejects.toThrow(NotFoundException);
            });
        });

        describe('checkPassword', () => {
            it('should return true for correct password', async () => {
                const result = await userUsecase.checkPassword(userId, '1234');
                expect(result).toBe(true);
            });

            it('should return false for incorrect password', async () => {
                const result = await userUsecase.checkPassword(userId, 'wrongpassword');
                expect(result).toBe(false);
            });
        });

        describe('changePassword', () => {
            it('should successfully change password', async () => {
                const newPassword = 'newpassword123';
                await userUsecase.changePassword(userId, newPassword);

                // Verify new password works
                const result = await userUsecase.checkPassword(userId, newPassword);
                expect(result).toBe(true);

                // Change back to original password for other tests
                await userUsecase.changePassword(userId, '1234');
            });

            it('should throw NotFoundException for non-existent userId', async () => {
                await expect(userUsecase.changePassword(NON_EXISTENT_UUID, 'newpassword')).rejects.toThrow(
                    NotFoundException,
                );
            });
        });
    });

    describe('SsoAuthUsecase', () => {
        // SSO 인증은 현재 구현되지 않았으므로 기본 동작만 테스트
        describe('validateUser', () => {
            it('should return null (not implemented)', async () => {
                const result = await ssoAuthUsecase.validateUser('test@email.com', 'password');
                expect(result).toBeNull();
            });
        });

        describe('login', () => {
            it('should return null (not implemented)', async () => {
                const result = await ssoAuthUsecase.login({ email: 'test@email.com', password: 'password' });
                expect(result).toBeNull();
            });
        });
    });
});
