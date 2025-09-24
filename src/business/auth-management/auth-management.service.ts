import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { Employee } from '@libs/entities';
import { DateUtil } from '@libs/utils/date.util';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Role } from '@libs/enums/role-type.enum';
import { LoginDto, SsoResponseDto, LoginResponseDto } from './dtos';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

/**
 * 인증 관리 비즈니스 서비스
 *
 * 인증 관련 비즈니스 로직을 처리합니다:
 * - SSO 로그인 처리
 * - 직원 정보 업데이트/생성
 * - JWT 토큰 생성
 * - 시스템 관리자 인증
 *
 * 특징:
 * - SSO API와 연동하여 인증 처리
 * - 직원 정보 자동 동기화
 * - JWT 기반 토큰 관리
 */
@Injectable()
export class AuthManagementService {
    private readonly logger = new Logger(AuthManagementService.name);

    constructor(private readonly employeeService: DomainEmployeeService) {}

    /**
     * 로그인 처리
     * @param loginDto 로그인 정보
     * @returns 로그인 결과 (토큰 및 사용자 정보)
     */
    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        this.logger.log(`로그인 시도: ${loginDto.email}`);

        try {
            // SSO 로그인 처리
            const ssoResponse = await this.ssoLogin(loginDto.email, loginDto.password);
            this.logger.log(`SSO 로그인 성공: ${loginDto.email}`);

            // 직원 정보 업데이트
            const updatedEmployee = await this.updateAuthInfo(ssoResponse);
            this.logger.log(`직원 정보 업데이트 완료: ${updatedEmployee.employeeId}`);

            return {
                accessToken: updatedEmployee.accessToken,
                email: updatedEmployee.email,
                name: updatedEmployee.name,
                department: updatedEmployee.department,
                position: updatedEmployee.position,
                roles: updatedEmployee.roles,
            };
        } catch (error) {
            this.logger.error(`로그인 실패: ${loginDto.email}`, error);
            throw error;
        }
    }

    /**
     * SSO API를 통한 인증 처리 (private)
     * @param email 이메일
     * @param password 비밀번호
     * @returns SSO 응답 데이터
     */
    private async ssoLogin(email: string, password: string): Promise<SsoResponseDto> {
        try {
            const client_id = process.env.SSO_CLIENT_ID;
            const client_secret = process.env.SSO_CLIENT_SECRET;
            const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

            const ssoApiUrl = process.env.SSO_API_URL;
            const response = await axios.post(
                `${ssoApiUrl}/api/auth/login`,
                {
                    grant_type: 'password',
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                    },
                },
            );

            const data: SsoResponseDto = response.data;
            data.password = await bcrypt.hash(password, 10);

            return data;
        } catch (error) {
            this.logger.error(`SSO 로그인 실패: ${email}`, error);
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }

    /**
     * 직원 정보 업데이트 또는 생성 (private)
     * @param ssoResponse SSO 응답 데이터
     * @returns 업데이트된 직원 정보
     */
    private async updateAuthInfo(ssoResponse: SsoResponseDto): Promise<Employee> {
        const employee = await this.employeeService.findOne({
            where: {
                employeeNumber: ssoResponse.employeeNumber,
            },
        });

        if (!employee) {
            // 새 직원 생성
            this.logger.log(`새 직원 생성: ${ssoResponse.employeeNumber}`);
            const newEmployee = await this.employeeService.create({
                employeeNumber: ssoResponse.employeeNumber,
                name: ssoResponse.name,
                email: ssoResponse.email,
                department: ssoResponse.department,
                position: ssoResponse.position,
                mobile: ssoResponse.phoneNumber,
                accessToken: ssoResponse.accessToken,
                expiredAt: DateUtil.format(ssoResponse.expiresAt, 'YYYY-MM-DD HH:mm:ss'),
            });
            return await this.employeeService.save(newEmployee);
        }

        // 기존 직원 정보 업데이트
        this.logger.log(`기존 직원 정보 업데이트: ${employee.employeeId}`);
        employee.password = ssoResponse.password;
        employee.mobile = ssoResponse.phoneNumber;
        employee.accessToken = ssoResponse.accessToken;
        employee.expiredAt = DateUtil.format(ssoResponse.expiresAt);
        employee.department = ssoResponse.department;
        employee.position = ssoResponse.position;

        return await this.employeeService.save(employee);
    }
}
