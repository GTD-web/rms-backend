import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@libs/entities';
import { EmployeeService } from './application/services/employee.service';
import { EmployeeController } from './infrastructure/adapters/in/web/controllers/employee.controller';
import { EmployeeRepository } from './infrastructure/adapters/out/persistence/employee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  providers: [
    EmployeeService,
    {
      provide: 'EmployeeRepositoryPort',
      useClass: EmployeeRepository,
    },
  ],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {} 