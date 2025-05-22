import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { Employee } from '@libs/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [EmployeeService, EmployeeRepository],
    exports: [EmployeeService],
})
export class EmployeeModule {}
