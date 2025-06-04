import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '@libs/entities/employee.entity';

@Injectable()
export class GetTokenUsecase {
    constructor(private readonly jwtService: JwtService) {}

    async execute(employee: Employee) {
        const payload = {
            sub: employee.employeeId,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: process.env.GLOBAL_SECRET,
        });

        return {
            accessToken,
            email: employee.email,
            name: employee.name,
            department: employee.department,
            position: employee.position,
            roles: employee.roles,
        };
    }
}
