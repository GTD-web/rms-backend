import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DomainEmployeeModule } from '@src/domain/employee/employee.module';
import { JwtStrategy } from '../../../libs/strategies/jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }), DomainEmployeeModule],
    providers: [JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthManagementModule {}
