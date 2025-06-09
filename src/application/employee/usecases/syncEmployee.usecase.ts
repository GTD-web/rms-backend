import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '@resource/domain/employee/employee.service';
import { MMSEmployeeResponseDto } from '@resource/application/employee/dtos/mms-employee-response.dto';

@Injectable()
export class SyncEmployeeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employees: MMSEmployeeResponseDto[]): Promise<void> {
        for (const employee of employees) {
            const existingEmployee = await this.employeeService.findOne({
                where: {
                    employeeNumber: employee.employee_number,
                },
            });

            if (employee.status === '퇴사') {
                if (existingEmployee) {
                    await this.employeeService.update(existingEmployee.employeeId, {
                        department: employee.status,
                        position: employee.status,
                    });
                }
                continue;
            }

            try {
                if (existingEmployee) {
                    existingEmployee.name = employee.name;
                    existingEmployee.employeeNumber = employee.employee_number;
                    existingEmployee.department = employee.department;
                    existingEmployee.position = employee.rank;
                    existingEmployee.mobile = employee.phone_number;
                    await this.employeeService.save(existingEmployee);
                } else {
                    console.log('create employee', employee);
                    const employeeData = {
                        employeeNumber: employee.employee_number,
                        name: employee.name,
                        email: employee.email,
                        department: employee.department,
                        position: employee.rank,
                        mobile: employee.phone_number,
                    };
                    const newEmployee = await this.employeeService.create(employeeData);
                    await this.employeeService.save(newEmployee);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
