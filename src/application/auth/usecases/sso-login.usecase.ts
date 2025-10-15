import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SsoResponseDto } from '@resource/application/auth/dto/sso-response.dto';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SsoLoginUsecase {
    constructor() {}

    async execute(email: string, password: string): Promise<SsoResponseDto> {
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
            console.log(error);
            throw new UnauthorizedException(ERROR_MESSAGE.BUSINESS.AUTH.SSO_LOGIN_FAILED);
        }
    }
}
