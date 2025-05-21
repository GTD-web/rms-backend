import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './infrastructure/adapters/out/persistence/employee.repository';
import { Employee } from '@libs/entities';
import { EmployeeService } from './application/services/employee.service';
import { EmployeeDomainController } from './infrastructure/adapters/in/domain/controllers/employee.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [
        EmployeeService,
        EmployeeRepository,
        {
            provide: 'EmployeeRepositoryPort',
            useClass: EmployeeRepository,
        },
    ],
    controllers: [EmployeeDomainController],
    exports: [EmployeeService],
})
export class EmployeeDomainModule {}
