import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@libs/entities';
import { EmployeeWebhookController } from './controllers/webhook.controller';
import { EmployeeService } from './employee.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    controllers: [EmployeeWebhookController],
    providers: [EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
