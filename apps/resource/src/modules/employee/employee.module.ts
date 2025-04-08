import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@libs/entities';
import { EmployeeService } from './application/services/employee.service';
import { EmployeeController } from './infrastructure/adapters/in/web/controllers/employee.controller';
import { EmployeeRepository } from './infrastructure/adapters/out/persistence/employee.repository';
import { EmployeeUseCase } from './application/usecases/employee.usecase';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmployeeEventHandler } from './application/handler/employee-event.handler';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [
        EmployeeService,
        {
            provide: 'EmployeeRepositoryPort',
            useClass: EmployeeRepository,
        },
        EmployeeUseCase,
        EmployeeEventHandler,
    ],
    controllers: [EmployeeController],
    exports: [EmployeeService, EmployeeUseCase],
})
export class EmployeeModule {}
